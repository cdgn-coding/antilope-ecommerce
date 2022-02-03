package mercadopago

const (
	MERCHANT_ORDER = "merchant_order"
	PAYMENT        = "payment"
)

type Notification struct {
	Id    string `json:"id"`
	Topic string `json:"topic"`
}
