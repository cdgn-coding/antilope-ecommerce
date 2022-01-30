package purchases

import (
	"time"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
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
	Payment   Payment   `json:"payment" gorm:"foreignKey:PurchaseID"`
	Packs     []Pack    `json:"packs" gorm:"foreignKey:ID"`
	CreatedAt time.Time `json:"createdAt" gorm:"autoUpdateTime"`
	UpdatedAt time.Time `json:"updatedAt" gorm:"autoCreateTime"`
}

type Payment struct {
	PurchaseID    string `json:"purchaseId"`
	MercadoPagoID string `json:"mercadoPagoId"`
}

type Pack struct {
	ID         string           `json:"id" gorm:"primaryKey"`
	PurchaseID string           `json:"purchaseId" gorm:"index"`
	ProductSku string           `json:"productSku" gorm:"index"`
	Product    products.Product `json:"product" gorm:"foreignKey:ProductSku"`
	Quantity   int64            `json:"quantity"`
	Amount     float64          `json:"amount"`
}

type Invoice struct {
	ID         string `json:"id" gorm:"primaryKey"`
	PurchaseID string `json:"purchaseId" gorm:"index"`
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
	id, err := ksuid.NewRandom()
	if err != nil {
		return *purchase, err
	}

	packAmount := product.Price * float64(quantity)
	pack := Pack{
		ID:         id.String(),
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
