package carts

import "time"

type Cart struct {
	Id        string              `json:"id"`
	Items     map[string]CartItem `json:"items"`
	CreatedAt time.Time           `json:"createdAt"`
	UpdatedAt time.Time           `json:"updatedAt"`
}

type CartItem struct {
	Quantity int64 `json:"quantity"`
}

func createCart(id string) Cart {
	now := time.Now()
	return Cart{
		Id:        id,
		Items:     make(map[string]CartItem),
		CreatedAt: now,
		UpdatedAt: now,
	}
}

func (cart Cart) AddProduct(sku string, cartItem CartItem) Cart {
	cart.Items[sku] = cartItem
	cart.UpdatedAt = time.Now()
	return cart
}

func (cart *Cart) RemoveProduct(sku string) {
	delete(cart.Items, sku)
	cart.UpdatedAt = time.Now()
}
