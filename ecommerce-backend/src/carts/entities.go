package carts

type Cart struct {
	Id       string              `json:"id"`
	Subtotal float64             `json:"subtotal"`
	Shipment float64             `json:"shipment"`
	Total    float64             `json:"total"`
	Items    map[string]CartItem `json:"items"`
}

type CartItem struct {
	Quantity int `json:"quantity"`
}
