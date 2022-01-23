package products

import (
	"time"
)

type Product struct {
	Sku         string `dynamo:",hash"`
	Name        string
	Price       int64
	Description string
	Stock       int64
	Images      []string
	CreatedAt   time.Time
}
