package products

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

type Product struct {
	Sku         string    `json:"sku" gorm:"primaryKey"`
	Name        string    `json:"name"`
	Price       float64   `json:"price"`
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

func (p Product) MarshalJSON() ([]byte, error) {
	images := make([]string, len(p.Images))
	baseUrl := os.Getenv("PRODUCTS_BUCKET_URL")
	for i, image := range p.Images {
		images[i] = fmt.Sprintf("%s/%s/%s.jpg", baseUrl, p.Sku, image.ID)
	}

	return json.Marshal(map[string]interface{}{
		"sku":         p.Sku,
		"name":        p.Name,
		"price":       p.Price,
		"description": p.Description,
		"category":    p.Category,
		"stock":       p.Stock,
		"images":      images,
	})
}
