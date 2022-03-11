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

func (r repository) SearchProductsMatching(product Product, offset, limit int) ([]Product, error) {
	db := clients.GormClient
	var products []Product
	result := db.Preload("Images").Where(&product).Offset(offset).Limit(limit).Find(&products)
	return products, result.Error
}

func (r repository) GetTotalProductsMatching(product Product) (int64, error) {
	db := clients.GormClient
	var count int64
	queryResponse := db.Model(&Product{}).Where(&product).Count(&count)
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
