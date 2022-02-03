package mercadopago

import (
	"fmt"
	"os"

	"github.com/go-resty/resty/v2"
)

func getRestclient() *resty.Client {
	authToken := os.Getenv("MERCADOPAGO_ACCESS_TOKEN")
	return resty.New().SetHeader("Authorization", fmt.Sprintf("Bearer %s", authToken))
}
