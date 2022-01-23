package products

import (
	"time"
)

type Product struct {
	ID          string `dynamo:",hash"`
	Name        string
	Price       int64
	Description string
	Sku         string
	Stock       int64
	Images      []string
	CreatedAt   time.Time
}
