package purchases

import (
	"time"

	"github.com/cdgn-coding/antilope-ecommerce/backend/src/products"
	"github.com/segmentio/ksuid"
)

type PurchaseStatus string

const (
	CREATED          = "CREATED"
	WAITING_PAYMENT  = "WAITING_PAYMENT"
	COMPLETED        = "COMPLETED"
	DOCUMENTED       = "DOCUMENTED"
	PAYMENT_REJECTED = "PAYMENT_REJECTED"
	CANCELLED        = "CANCELLED"
)

type Purchase struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	UserID    string    `json:"userId"`
	Amount    float64   `json:"amount"`
	Status    string    `json:"status"`
	Payment   Payment   `json:"payment" gorm:"foreignkey:PurchaseID"`
	Packs     []Pack    `json:"packs" gorm:"foreignkey:PurchaseID"`
	InvoiceID string    `json:"invoiceId"`
	CreatedAt time.Time `json:"createdAt" gorm:"autoUpdateTime"`
	UpdatedAt time.Time `json:"updatedAt" gorm:"autoCreateTime"`
}

type Payment struct {
	PurchaseID       string `json:"purchaseId" gorm:"primaryKey"`
	MercadoPagoURL   string `json:"mercadoPagoURL"`
	MercadoPagoOrder int64  `json:"mercadoPagoOrder,omitempty"`
}

type Pack struct {
	PurchaseID string           `json:"purchaseId" gorm:"primaryKey"`
	ProductSku string           `json:"productSku" gorm:"primaryKey`
	Product    products.Product `json:"product" gorm:"foreignKey:ProductSku"`
	Quantity   int64            `json:"quantity"`
	Amount     float64          `json:"amount"`
}

func (p Purchase) createPurchase(userId string) (Purchase, error) {
	id, err := ksuid.NewRandom()
	if err != nil {
		return Purchase{}, err
	}

	purchase := Purchase{
		ID:     id.String(),
		UserID: userId,
		Status: CREATED,
		Amount: 0,
		Packs:  []Pack{},
	}

	return purchase, nil
}

func (purchase *Purchase) addPack(product products.Product, quantity int64) (Purchase, error) {
	packAmount := product.Price * float64(quantity)
	pack := Pack{
		PurchaseID: purchase.ID,
		ProductSku: product.Sku,
		Product:    product,
		Quantity:   quantity,
		Amount:     packAmount,
	}

	purchase.Packs = append(purchase.Packs, pack)
	purchase.Amount += packAmount

	return *purchase, nil
}

func (purchase *Purchase) createPayment(mercadoPagoInitPoint, mercadoPagoPreference string) (Purchase, error) {
	purchase.Status = WAITING_PAYMENT
	purchase.Payment = Payment{
		PurchaseID:     purchase.ID,
		MercadoPagoURL: mercadoPagoInitPoint,
	}
	return *purchase, nil
}

func (purchase *Purchase) completeWithMercadoPago(mercadopagoOrder int64) {
	purchase.Status = COMPLETED
	purchase.Payment.MercadoPagoOrder = mercadopagoOrder
}
