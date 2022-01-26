package products

import (
	"time"
)

type Product struct {
	Sku         string `gorm:"primaryKey"`
	Name        string
	Price       int64
	Description string
	Category    string `gorm:"index"`
	Stock       int64
	Images      []Images  `gorm:"foreignKey:ProductSku"`
	CreatedAt   time.Time `gorm:"autoUpdateTime"`
	UpdatedAt   time.Time `gorm:"autoCreateTime"`
}

type Images struct {
	ProductSku string `gorm:"primaryKey"`
	Path       string
}
