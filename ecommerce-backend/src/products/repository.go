package products

import (
	"fmt"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
)

type repository struct{}

func (r repository) SaveProduct(product *Product) error {
	db, err := clients.GetPostgresClient()
	if err != nil {
		return fmt.Errorf("Error connecting to database: %s", err)
	}

	result := db.Save(&product)

	if result.Error != nil {
		return fmt.Errorf("Cannot create product: %s", err)
	}

	return nil
}

func (r repository) GetProduct(sku string) (*Product, error) {
	db, err := clients.GetPostgresClient()
	if err != nil {
		return nil, fmt.Errorf("Error connecting to database: %s", err)
	}
	product := &Product{}
	result := db.First(&product, sku)
	return product, result.Error
}
