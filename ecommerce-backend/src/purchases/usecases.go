package purchases

import (
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
)

type Usecases struct{}

func (u Usecases) BuyCart(userId string) (responses.Response, error) {
	return responses.EmptyResponse, nil
}

func (u Usecases) BuyProduct(userId, productSku string) (responses.Response, error) {
	var purchase Purchase
	var product products.Product
	var err error

	purchase, err = Purchase{}.createPurchase(userId)
	if err != nil {
		return responses.EmptyResponse, err
	}

	r, err := products.Usecases{}.GetProduct(productSku)
	product = r.Data.(products.Product)

	if err != nil {
		return responses.EmptyResponse, err
	}

	purchase.addPack(product, 1)
	err = repository{}.SavePurchase(purchase)

	if err != nil {
		return responses.EmptyResponse, err
	}

	return responses.Response{Data: purchase}, nil
}
