package carts

type Usecases struct{}

func (u Usecases) GetCartById(id string) (Cart, error) {
	cart, err := repository{}.GetCartById(id)
	return cart, err
}

func (u Usecases) DeleteProductFromCart(id, sku string) (Cart, error) {
	var err error
	var cart Cart

	cart, err = repository{}.GetCartById(id)

	if err != nil {
		return cart, err
	}

	cart.RemoveProduct(sku)
	err = repository{}.PutCart(cart)
	return cart, err
}

func (u Usecases) PutProductQuantity(id, sku string, cartItem CartItem) (Cart, error) {
	var err error
	var cart Cart

	cart, err = repository{}.GetCartById(id)

	if err != nil {
		cart := createCart(id).AddProduct(sku, cartItem)
		err := repository{}.PutCart(cart)
		return cart, err
	}

	cart.AddProduct(sku, cartItem)
	err = repository{}.PutCart(cart)
	return cart, err
}
