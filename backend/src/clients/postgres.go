package clients

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetPostgresClient() (*gorm.DB, error) {
	dsn := os.Getenv("POSTGRES_DSN")
	return gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})

}
