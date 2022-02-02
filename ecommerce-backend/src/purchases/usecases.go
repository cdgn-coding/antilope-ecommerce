package purchases

import (
	"fmt"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/carts"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/mercadopago"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
)

type Usecases struct{}

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

	err = repository{}.CreatePurchase(purchase)
	return &purchase, nil
}

func (u Usecases) BuyProduct(userId, productSku string) (*Purchase, error) {
	var purchase Purchase
	var err error

	purchase, err = Purchase{}.createPurchase(userId)
	if err != nil {
		return nil, err
	}

	addProductToPurchase(&purchase, productSku, 1)
	if err != nil {
		return nil, err
	}

	configurePayment(&purchase)
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
