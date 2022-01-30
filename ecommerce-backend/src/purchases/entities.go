package purchases

import (
	"time"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
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
	Amount    float64   `json:"amount"`
	Status    string    `json:"status"`
	Packs     []Pack    `json:"packs" gorm:"foreignKey:ID"`
	CreatedAt time.Time `json:"createdAt" gorm:"autoUpdateTime"`
	UpdatedAt time.Time `json:"updatedAt" gorm:"autoCreateTime"`
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
