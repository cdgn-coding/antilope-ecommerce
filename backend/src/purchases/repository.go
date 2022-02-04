package purchases

import (
	"fmt"

	"github.com/cdgn-coding/antilope-ecommerce/backend/src/clients"
)

type repository struct{}

func (r repository) CreatePurchase(purchase Purchase) error {
	db := clients.GormClient
	return db.Create(&purchase).Error
}

func (r repository) UpdatePurchase(purchase Purchase) error {
	db := clients.GormClient
	err := db.Model(&purchase.Payment).Updates(purchase.Payment).Error

	if err != nil {
		return fmt.Errorf("error updating payment: %w", err)
	}

	err = db.Model(&purchase).Update("status", purchase.Status).Error
	if err != nil {
		return fmt.Errorf("error updating purchase: %w", err)
	}

	return nil
}

func (r repository) GetPurchase(id string) (Purchase, error) {
	var purchase Purchase
	db := clients.GormClient
	err := db.Preload("Payment").
		Preload("Packs").
		First(&purchase, "id = ?", id).
		Error

	return purchase, err
}
