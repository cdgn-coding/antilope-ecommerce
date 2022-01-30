package purchases

import (
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
	"gorm.io/gorm"
)

type repository struct{}

func (r repository) GetProduct(sku string) (products.Product, error) {
	var db *gorm.DB
	var err error
	var product products.Product

	db, err = clients.GetPostgresClient()
	if err != nil {
		return products.Product{}, err
	}

	result := db.First(&product, sku)
	return product, result.Error
}

func (r repository) SavePurchase(purchase Purchase) error {
	var db *gorm.DB
	var err error

	db, err = clients.GetPostgresClient()
	if err != nil {
		return err
	}

	return db.Create(&purchase).Error
}
