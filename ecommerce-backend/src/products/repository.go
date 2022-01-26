package products

import (
	"fmt"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
)

type repository struct{}

func (r repository) SaveProduct(product Product) error {
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

func (r repository) GetProduct(sku string) (Product, error) {
	db, err := clients.GetPostgresClient()
	if err != nil {
		return Product{}, fmt.Errorf("Error connecting to database: %s", err)
	}
	var product Product
	result := db.First(&product, sku)
	return product, result.Error
}

func (r repository) SearchProductsMatching(product Product, offset, limit int) ([]Product, error) {
	db, err := clients.GetPostgresClient()
	if err != nil {
		return nil, fmt.Errorf("Error connecting to database: %s", err)
	}
	var products []Product
	result := db.Where(&product).Find(&products).Offset(offset).Limit(limit)
	return products, result.Error
}

func (r repository) GetTotalProductsMatching(product Product) (int64, error) {
	db, err := clients.GetPostgresClient()
	if err != nil {
		return 0, fmt.Errorf("Error connecting to database: %s", err)
	}
	var count int64
	queryResponse := db.Model(&Product{}).Where(&product).Count(&count)
	return count, queryResponse.Error
}
