package purchases

import (
	"fmt"
	"math"

	"github.com/cdgn-coding/antilope-ecommerce/backend/src/carts"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/mercadopago"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/products"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/responses"
)

type Usecases struct{}

func (u Usecases) GetPurchases(userId string, page int) (responses.PaginatedResponse, error) {
	if page == 0 {
		page = 1
	}

	limit := 15
	offset := page * limit
	purchases, err := repository{}.GetPurchasesByUserId(userId, offset, limit)

	if err != nil {
		return responses.PaginatedResponse{}, err
	}

	totalItems, err := repository{}.GetTotalPurchasesByUserId(userId)
	if err != nil {
		return responses.PaginatedResponse{}, fmt.Errorf("Error counting products: %w", err)
	}
	totalPages := math.Ceil(float64(totalItems) / float64(limit))

	response := responses.PaginatedResponse{
		Data:       purchases,
		Page:       int64(page),
		TotalPages: int64(totalPages),
		TotalItems: totalItems,
	}

	return response, nil
}

func addProductToPurchase(purchase *Purchase, productSku string, productQuantity int64) error {
	var product *products.Product
	var err error

	product, err = products.Usecases{}.GetProduct(productSku)
	if err != nil {
		return err
	}

	purchase.addPack(*product, productQuantity)

	return nil
}

func createPreference(purchase *Purchase) (*mercadopago.Preference, error) {
	preference := mercadopago.Preference{
		ExternalReference: purchase.ID,
		Items:             []mercadopago.Item{},
	}

	for _, pack := range purchase.Packs {
		preference.Items = append(preference.Items, mercadopago.Item{
			Title:     pack.Product.Name,
			Quantity:  pack.Quantity,
			UnitPrice: pack.Amount,
		})
	}

	result, err := mercadopago.CreatePreference(preference)

	if err != nil {
		return nil, err
	}

	return &result, nil
}

func configurePayment(purchase *Purchase) error {
	preference, err := createPreference(purchase)

	if err != nil {
		return err
	}

	purchase.createPayment(preference.InitPoint, preference.ID)

	return nil
}

func (u Usecases) BuyCart(userId string) (*Purchase, error) {
	cart, err := carts.Usecases{}.GetCartById(userId)
	if err != nil {
		return nil, err
	}

	if len(cart.Items) == 0 {
		return nil, fmt.Errorf("Cart is empty")
	}

	purchase, err := Purchase{}.createPurchase(userId)
	if err != nil {
		return nil, err
	}

	for productSku, cartItem := range cart.Items {
		err = addProductToPurchase(&purchase, productSku, cartItem.Quantity)

		if err != nil {
			return nil, err
		}
	}

	err = configurePayment(&purchase)
	if err != nil {
		return nil, err
	}

	err = repository{}.CreatePurchase(purchase)
	if err != nil {
		return nil, err
	}

	carts.Usecases{}.DeleteCart(userId)

	return &purchase, nil
}

func (u Usecases) BuyProduct(userId, productSku string) (*Purchase, error) {
	var purchase Purchase
	var err error

	purchase, err = Purchase{}.createPurchase(userId)
	if err != nil {
		return nil, err
	}

	err = addProductToPurchase(&purchase, productSku, 1)
	if err != nil {
		return nil, err
	}

	err = configurePayment(&purchase)
	if err != nil {
		return nil, err
	}

	err = repository{}.CreatePurchase(purchase)
	if err != nil {
		return nil, err
	}

	return &purchase, nil
}

func (u Usecases) ReceiveMercadoPagoNotification(topic, id string) error {
	if topic != mercadopago.MERCHANT_ORDER {
		return nil
	}

	order, err := mercadopago.GetMerchantOrder(id)

	if err != nil {
		return err
	}

	if !order.IsTotallyPaid() {
		return nil
	}

	purchase, err := repository{}.GetPurchase(order.ExternalReference)
	if err != nil {
		return fmt.Errorf("Purchase not found. %w", err)
	}
	purchase.completeWithMercadoPago(order.Id)
	err = repository{}.UpdatePurchase(purchase)

	if err != nil {
		return err
	}

	return nil
}
