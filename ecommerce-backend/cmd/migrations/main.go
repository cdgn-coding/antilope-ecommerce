package main

import (
	"log"
	"os"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	log.SetOutput(os.Stdout)

	log.Print("Setting up development database...")

	log.Print("Connecting...")
	db, err := clients.GetPostgresClient()
	if err != nil {
		log.Fatal(err)
	}

	log.Print("Automigrating...")
	err = db.AutoMigrate(&products.Product{}, &products.Image{})

	if err != nil {
		log.Fatal(err)
	}
}
