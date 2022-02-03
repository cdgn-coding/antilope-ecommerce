package mercadopago

import (
	"encoding/json"
)

type Preference struct {
	ID                string `json:"id,omitempty"`
	InitPoint         string `json:"init_point,omitempty"`
	ExternalReference string `json:"external_reference"`
	Items             []Item `json:"items"`
}

type Item struct {
	Title     string  `json:"title"`
	Quantity  int64   `json:"quantity"`
	UnitPrice float64 `json:"unit_price"`
}

func CreatePreference(preference Preference) (Preference, error) {
	resp, err := getRestclient().R().
		SetBody(preference).
		Post("https://api.mercadopago.com/checkout/preferences")
	json.Unmarshal(resp.Body(), &preference)
	return preference, err
}
