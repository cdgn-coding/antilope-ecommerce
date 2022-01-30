package purchases

import (
	"fmt"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/carts"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
)

type Usecases struct{}

func addProductToPurchase(purchase *Purchase, productSku string, productQuantity int64) {
	var product *products.Product
	var err error

	product, err = products.Usecases{}.GetProduct(productSku)
	if err != nil {
		return
	}

	purchase.addPack(*product, productQuantity)
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
		addProductToPurchase(&purchase, productSku, cartItem.Quantity)
	}

	err = repository{}.SavePurchase(purchase)
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
	err = repository{}.SavePurchase(purchase)
	if err != nil {
		return nil, err
	}

	return &purchase, nil
}
