package products

import (
	"errors"
	"fmt"
)

type usecases struct{}

func (u usecases) SaveProduct(product Product) error {
	if product.Sku == "" {
		return errors.New("Sku is required")
	}

	err := repository{}.SaveProduct(product)
	if err != nil {
		return fmt.Errorf("Error creating product: %w", err)
	}

	return nil
}

func (u usecases) GetProduct(sku string) (Product, error) {
	if sku == "" {
		return Product{}, errors.New("Sku is required")
	}

	product, err := repository{}.GetProduct(sku)
	if err != nil {
		return Product{}, fmt.Errorf("Error fetching product: %w", err)
	}

	return product, nil
}

func (u usecases) SearchProducts(search, page, category string) ([]Product, error) {
	var product Product

	if category != "" {
		product.Category = category
	}

	if search != "" {
		product.Name = search
	}

	products, err := repository{}.SearchProductsMatching(product)

	if err != nil {
		return nil, fmt.Errorf("Error searching products: %w", err)
	}

	return products, nil
}
