package carts

import (
	"fmt"
	"log"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
)

type usecases struct{}

func (u usecases) GetCartById(id string) (responses.Response, error) {
	cart, err := repository{}.GetCartById(id)
	if err != nil {
		return responses.Response{}, fmt.Errorf("Error while fetching Cart %w", err)
	}
	return responses.Response{Data: cart}, nil
}

func createCartWithProductQuantity(id string, sku string, cartItem CartItem) (responses.Response, error) {
	items := make(map[string]CartItem)
	items[sku] = cartItem

	cart := Cart{
		Id:    id,
		Items: items,
	}

	err := repository{}.PutCart(cart)
	return responses.Response{Data: cart}, err
}

func putProductQuantityToExistingCart(cart Cart, sku string, cartItem CartItem) (responses.Response, error) {
	log.Print(cart)
	cart.Items[sku] = cartItem
	err := repository{}.PutCart(cart)
	return responses.Response{Data: cart}, err
}

func (u usecases) PutProductQuantity(id, sku string, cartItem CartItem) (responses.Response, error) {
	cart, err := repository{}.GetCartById(id)
	if err != nil {
		return createCartWithProductQuantity(id, sku, cartItem)
	}
	return putProductQuantityToExistingCart(cart, sku, cartItem)
}
