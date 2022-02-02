package mercadopago

import (
	"encoding/json"
	"fmt"
)

var OrderStatus = struct {
	CLOSED  string
	OPENED  string
	EXPIRED string
}{
	CLOSED:  "closed",
	OPENED:  "opened",
	EXPIRED: "expired",
}

type Order struct {
	Id                int64  `json:"id"`
	ExternalReference string `json:"external_reference"`
	PreferenceId      string `json:"preference_id"`
	OrderStatus       string `json:"order_status"`
	Status            string `json:"status"`
}

func (order *Order) IsTotallyPaid() bool {
	return order.Status == OrderStatus.CLOSED
}

func GetMerchantOrder(orderId string) (Order, error) {
	resp, err := getRestclient().R().
		Get(fmt.Sprintf("https://api.mercadopago.com/merchant_orders/%s", orderId))

	var order Order
	json.Unmarshal(resp.Body(), &order)

	return order, err
}
