package purchases

import (
	"fmt"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/products"
	"gorm.io/gorm"

	"github.com/cdgn-coding/antilope-ecommerce/backend/src/clients"
)

type repository struct{}

func (r repository) CreatePurchase(purchase Purchase) error {
	db := clients.GormClient
	err := db.Transaction(func(tx *gorm.DB) error {
		err := db.Create(&purchase).Error
		if err != nil {
			return err
		}

		for _, pack := range purchase.Packs {
			product := products.Product{}
			db.Select("stock").Where("sku = ?", pack.ProductSku).First(&product)

			if (product.Stock - pack.Quantity) < 0 {
				return fmt.Errorf("cannot buy more than it exist")
			}

			err = db.Model(&products.Product{}).
				Where("sku = ?", pack.ProductSku).
				Update("stock", gorm.Expr("stock - ?", pack.Quantity)).
				Error

			if err != nil {
				return err
			}
		}

		return nil
	})
	return err
}

func (r repository) GetTotalPurchasesByUserId(userId string) (int64, error) {
	var count int64
	db := clients.GormClient
	err := db.Model(&Purchase{}).Where("user_id = ?", userId).Count(&count).Error

	return count, err
}

func (r repository) GetPurchasesByUserId(userId string, offset int, limit int) ([]Purchase, error) {
	var purchases []Purchase
	db := clients.GormClient
	err := db.
		Preload("Payment").
		Preload("Packs").
		Where("user_id = ?", userId).
		Order("created_at desc").
		Find(&purchases).
		Offset(offset).
		Limit(limit).
		Error

	return purchases, err
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
