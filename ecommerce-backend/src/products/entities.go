package products

import (
	"time"
)

type Product struct {
	Sku         string `gorm:"primaryKey"`
	Name        string
	Price       int64
	Description string
	category    string `gorm:"index"`
	Stock       int64
	//Images      []string
	CreatedAt time.Time
}
