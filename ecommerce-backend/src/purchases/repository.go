package purchases

import (
	"fmt"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
	"gorm.io/gorm"
)

type repository struct{}

func (r repository) CreatePurchase(purchase Purchase) error {
	var db *gorm.DB
	var err error

	db, err = clients.GetPostgresClient()
	if err != nil {
		return err
	}

	return db.Create(&purchase).Error
}

func (r repository) UpdatePurchase(purchase Purchase) error {
	var db *gorm.DB
	var err error

	db, err = clients.GetPostgresClient()
	if err != nil {
		return err
	}

	err = db.Model(&purchase.Payment).Updates(purchase.Payment).Error
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
	var db *gorm.DB
	var err error
	var purchase Purchase

	db, err = clients.GetPostgresClient()
	if err != nil {
		return Purchase{}, err
	}

	err = db.Preload("Payment").
		Preload("Packs").
		First(&purchase, "id = ?", id).
		Error

	return purchase, err
}
