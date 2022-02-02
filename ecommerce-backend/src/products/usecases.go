package products

import (
	"errors"
	"fmt"
	"io"
	"math"

	"github.com/segmentio/ksuid"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
)

type Usecases struct{}

func (u Usecases) SaveProduct(product Product) (*Product, error) {
	if product.Sku == "" {
		return nil, errors.New("Sku is required")
	}

	err := repository{}.SaveProduct(product)
	if err != nil {
		return nil, fmt.Errorf("Error creating product: %w", err)
	}

	return &product, nil
}

func (u Usecases) GetProduct(sku string) (*Product, error) {
	if sku == "" {
		return nil, errors.New("Sku is required")
	}

	product, err := repository{}.GetProduct(sku)
	if err != nil {
		return nil, fmt.Errorf("Error fetching product: %w", err)
	}

	return &product, nil
}

func (u Usecases) SearchProducts(search, category string, page int) (responses.PaginatedResponse, error) {
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

func (u Usecases) AddImageToProduct(sku string, image io.ReadSeeker) (*Image, error) {
	ksuid, err := ksuid.NewRandom()

	if err != nil {
		return nil, fmt.Errorf("Error generating ksuid: %w", err)
	}

	fileKey := fmt.Sprintf("%s/%s.jpg", sku, ksuid.String())
	err = uploadFileToS3(fileKey, image)
	if err != nil {
		return nil, fmt.Errorf("Error uploading image: %w", err)
	}

	savedImage, err := repository{}.SaveImageToProduct(sku, ksuid.String())

	return &savedImage, nil
}
