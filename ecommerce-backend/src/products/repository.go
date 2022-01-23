package products

import (
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
)

type repository struct{}

func (r repository) CreateOrUpdateProduct(product *Product) error {
	dynamodb := clients.GetDynamoDBClient()
	err := dynamodb.Table("products").Put(product).Run()
	return err
}

func (r repository) GetProduct(sku string) (*Product, error) {
	dynamodb := clients.GetDynamoDBClient()
	product := &Product{}
	err := dynamodb.Table("products").Get("Sku", sku).One(product)
	return product, err
}
