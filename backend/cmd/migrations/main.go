package main

import (
	"log"
	"os"

	"github.com/cdgn-coding/antilope-ecommerce/backend/src/clients"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/products"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/purchases"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	log.SetOutput(os.Stdout)

	log.Print("Setting up development database...")

	log.Print("Connecting...")
	clients.StartGormClient()
	db := clients.GormClient

	log.Print("Automigrating...")
	log.Print("Products...")
	err := db.AutoMigrate(&products.Product{}, &products.Image{})

	log.Print("Purchases...")
	err = db.AutoMigrate(&purchases.Purchase{}, &purchases.Pack{}, &purchases.Payment{})

	if err != nil {
		log.Fatal(err)
	}
}
