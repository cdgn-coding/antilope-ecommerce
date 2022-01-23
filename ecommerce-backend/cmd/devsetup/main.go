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
	log.Print("Creating DynamoDB tables")
	dynamodb := clients.GetDynamoDBClient()
	err := dynamodb.CreateTable("products", products.Product{}).Run()

	if err != nil {
		log.Fatal(err)
	}
}
