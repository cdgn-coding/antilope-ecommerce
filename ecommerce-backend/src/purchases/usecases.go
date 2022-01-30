package purchases

import (
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
)

type usecases struct{}

func (u usecases) BuyCart(userId string) (responses.Response, error) {
	return responses.EmptyResponse, nil
}

func (u usecases) BuyProduct(userId, productSku string) (responses.Response, error) {
	var purchase Purchase
	var product products.Product
	var err error

	purchase, err = Purchase{}.createPurchase(userId)
	if err != nil {
		return responses.EmptyResponse, err
	}

	product, err = repository{}.GetProduct(productSku)

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
