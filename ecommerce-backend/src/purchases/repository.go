package purchases

import (
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
	"gorm.io/gorm"
)

type repository struct{}

func (r repository) SavePurchase(purchase Purchase) error {
	var db *gorm.DB
	var err error

	db, err = clients.GetPostgresClient()
	if err != nil {
		return err
	}

	return db.Create(&purchase).Error
}
