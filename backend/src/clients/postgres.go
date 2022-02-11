package clients

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func getPostgresClient() *gorm.DB {
	dsn := os.Getenv("POSTGRES_DSN")
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	return db
}

func StartGormClient() {
	GormClient = getPostgresClient()
}

var GormClient *gorm.DB
