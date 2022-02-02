package carts

import (
	"fmt"
	"os"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
)

type repository struct{}

func (r repository) GetCartById(id string) (Cart, error) {
	dynamodb := clients.GetDynamoDBClient()
	table := os.Getenv("CARTS_DYNAMODB_TABLE_ID")
	cart := Cart{}
	err := dynamodb.Table(table).Get("Id", id).One(&cart)

	if err != nil {
		return Cart{}, fmt.Errorf("Error while fetching Cart %w", err)
	}

	return cart, nil
}

func (r repository) PutCart(cart Cart) error {
	dynamodb := clients.GetDynamoDBClient()
	table := os.Getenv("CARTS_DYNAMODB_TABLE_ID")
	err := dynamodb.Table(table).Put(cart).Run()

	if err != nil {
		return fmt.Errorf("Error while saving Cart %w", err)
	}

	return nil
}
