package products

import (
	"fmt"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/clients"
)

type repository struct{}

func (r repository) SaveProduct(product Product) error {
	db := clients.GormClient
	err := db.Save(&product).Error

	if err != nil {
		return fmt.Errorf("Cannot create product: %s", err)
	}

	return nil
}

func (r repository) GetProduct(sku string) (Product, error) {
	db := clients.GormClient
	var product Product
	result := db.Preload("Images").Where("sku = ?", sku).First(&product)
	return product, result.Error
}

func (r repository) SearchProducts(name, category string, offset, limit int) ([]Product, error) {
	db := clients.GormClient
	criteria, arguments := r.getSearchArguments(name, category)
	var products []Product
	err := db.Preload("Images").Where(criteria, arguments...).Offset(offset).Limit(limit).Find(&products).Error
	return products, err
}

func (r repository) GetTotalProductsMatching(name, category string) (int64, error) {
	db := clients.GormClient
	var count int64
	criteria, arguments := r.getSearchArguments(name, category)
	queryResponse := db.Model(&Product{}).Where(criteria, arguments...).Count(&count)
	return count, queryResponse.Error
}

func (r repository) SaveImageToProduct(sku, imageId string) (Image, error) {
	db := clients.GormClient
	image := Image{ID: imageId, ProductSku: sku}

	err := db.Save(&image).Error
	if err != nil {
		return image, fmt.Errorf("Error saving image to product: %w", err)
	}

	return image, nil
}

func (r repository) getSearchArguments(name string, category string) (string, []interface{}) {
	variables := make([]interface{}, 0)

	if name == "" && category == "" {
		return "stock > 0", variables
	}

	if name != "" && category == "" {
		likeName := fmt.Sprintf("%%%s%%", name)
		variables = append(variables, likeName)
		return "stock > 0 AND name ILIKE ?", variables
	}

	if name == "" && category != "" {
		variables = append(variables, category)
		return "stock > 0 AND category = ?", variables
	}

	likeName := fmt.Sprintf("%%%s%%", name)
	variables = append(variables, likeName, category)
	return "stock > 0 AND name ILIKE ? AND category = ?", variables
}
