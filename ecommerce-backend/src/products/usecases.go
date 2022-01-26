package products

import (
	"errors"
	"fmt"
	"math"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
)

type usecases struct{}

func (u usecases) SaveProduct(product Product) (responses.Response, error) {
	if product.Sku == "" {
		return responses.Response{}, errors.New("Sku is required")
	}

	err := repository{}.SaveProduct(product)
	if err != nil {
		return responses.Response{}, fmt.Errorf("Error creating product: %w", err)
	}

	response := responses.Response{
		Data: product,
	}
	return response, nil
}

func (u usecases) GetProduct(sku string) (responses.Response, error) {
	if sku == "" {
		return responses.Response{}, errors.New("Sku is required")
	}

	product, err := repository{}.GetProduct(sku)
	if err != nil {
		return responses.Response{}, fmt.Errorf("Error fetching product: %w", err)
	}

	response := responses.Response{
		Data: product,
	}
	return response, nil
}

func (u usecases) SearchProducts(search, category string, page int) (responses.PaginatedResponse, error) {
	var product Product

	if category != "" {
		product.Category = category
	}

	if search != "" {
		product.Name = search
	}

	if page == 0 {
		page = 1
	}

	limit := 15
	offset := page * limit
	products, err := repository{}.SearchProductsMatching(product, offset, limit)

	if err != nil {
		return responses.PaginatedResponse{}, fmt.Errorf("Error searching products: %w", err)
	}

	totalItems, err := repository{}.GetTotalProductsMatching(product)
	if err != nil {
		return responses.PaginatedResponse{}, fmt.Errorf("Error counting products: %w", err)
	}

	totalPages := math.Ceil(float64(totalItems) / float64(limit))
	response := responses.PaginatedResponse{
		Data:       products,
		Page:       int64(page),
		TotalPages: int64(totalPages),
		TotalItems: totalItems,
	}

	return response, nil
}
