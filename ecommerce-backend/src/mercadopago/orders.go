package mercadopago

import (
	"encoding/json"
	"fmt"
)

type Order struct {
}

func GetOrder(orderId string) (Order, error) {
	resp, err := getRestclient().R().
		Get(fmt.Sprintf("https://api.mercadopago.com/merchant_orders/%s", orderId))

	var order Order
	json.Unmarshal(resp.Body(), &order)

	return order, err
}
