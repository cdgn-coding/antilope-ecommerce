package products

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func PutProduct(w http.ResponseWriter, r *http.Request) {
	var product Product
	var err error
	err = json.NewDecoder(r.Body).Decode(&product)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Errorf("Error decoding product: %w", err).Error()))
		return
	}

	err = usecases{}.SaveProduct(product)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Errorf("Error processing product: %w", err).Error()))
		return
	}

	resultJson, _ := json.Marshal(product)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}

func GetProduct(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	sku := params["sku"]

	product, err := usecases{}.GetProduct(sku)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(fmt.Errorf("Error getting product: %w", err).Error()))
		return
	}

	resultJson, _ := json.Marshal(product)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}

func SearchProducts(w http.ResponseWriter, r *http.Request) {
	search := r.URL.Query().Get("search")
	page := r.URL.Query().Get("page")
	category := r.URL.Query().Get("category")

	products, err := usecases{}.SearchProducts(search, page, category)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(fmt.Errorf("Error getting products: %w", err).Error()))
		return
	}

	resultJson, _ := json.Marshal(products)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}
