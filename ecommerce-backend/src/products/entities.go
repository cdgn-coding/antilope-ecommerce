package products

import (
	"time"
)

type Product struct {
	Sku         string    `json:"sku" gorm:"primaryKey"`
	Name        string    `json:"name"`
	Price       int64     `json:"price"`
	Description string    `json:"description"`
	Category    string    `json:"category" gorm:"index"`
	Stock       int64     `json:"stock"`
	Images      []Image   `json:"images" gorm:"foreignKey:ProductSku"`
	CreatedAt   time.Time `json:"createdAt" gorm:"autoUpdateTime"`
	UpdatedAt   time.Time `json:"updatedAt" gorm:"autoCreateTime"`
}

type Image struct {
	ID         string `json:"id" gorm:"primaryKey"`
	ProductSku string `json:"productSku" gorm:"index"`
}
