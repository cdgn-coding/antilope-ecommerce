package products

import (
	"errors"
	"fmt"
)

type usecases struct{}

func (u usecases) CreateOrUpdateProduct(product *Product) error {
	if product.Sku == "" {
		return errors.New("Sku is required")
	}

	existingProduct, err := repository{}.GetProduct(product.Sku)
	if err != nil {
		return fmt.Errorf("Error asserting product existance: %w", err)
	}

	if existingProduct == nil {
		err := repository{}.CreateProduct(product)
		if err != nil {
			return fmt.Errorf("Error creating product: %w", err)
		}
	}

	return nil
}

func (u usecases) GetProduct(sku string) (*Product, error) {
	if sku == "" {
		return nil, errors.New("Sku is required")
	}

	product, err := repository{}.GetProduct(sku)
	if err != nil {
		return nil, fmt.Errorf("Error fetching product: %w", err)
	}

	return product, nil
}
