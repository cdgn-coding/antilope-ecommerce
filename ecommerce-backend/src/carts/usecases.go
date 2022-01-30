package carts

import (
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
)

type Usecases struct{}

func (u Usecases) GetCartById(id string) (responses.Response, error) {
	cart, err := repository{}.GetCartById(id)
	return responses.Response{Data: cart}, err
}

func (u Usecases) PutProductQuantity(id, sku string, cartItem CartItem) (responses.Response, error) {
	var err error
	var cart Cart

	cart, err = repository{}.GetCartById(id)

	if err != nil {
		cart := createCart(id).AddProduct(sku, cartItem)
		err := repository{}.PutCart(cart)
		return responses.Response{Data: cart}, err
	}

	cart.AddProduct(sku, cartItem)
	err = repository{}.PutCart(cart)
	return responses.Response{Data: cart}, err
}
