package clients

import (
	"gorm.io/gorm/logger"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func getPostgresClient() *gorm.DB {
	dsn := os.Getenv("POSTGRES_DSN")
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})

	if err != nil {
		panic(err)
	}
	return db
}

func StartGormClient() {
	GormClient = getPostgresClient()
}

var GormClient *gorm.DB
