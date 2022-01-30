package products

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
	"github.com/gorilla/mux"
)

func PutProduct(w http.ResponseWriter, r *http.Request) {
	var product *Product
	var responseResult responses.Response
	var err error
	err = json.NewDecoder(r.Body).Decode(&product)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Errorf("Error decoding product: %w", err).Error()))
		return
	}

	product, err = Usecases{}.SaveProduct(*product)
	responseResult = responses.Response{Data: product}
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Errorf("Error processing product: %w", err).Error()))
		return
	}

	resultJson, _ := json.Marshal(responseResult)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}

func GetProduct(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	sku := params["sku"]

	product, err := Usecases{}.GetProduct(sku)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(fmt.Errorf("Error getting product: %w", err).Error()))
		return
	}

	responseResult := responses.Response{Data: product}
	resultJson, _ := json.Marshal(responseResult)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}

func SearchProducts(w http.ResponseWriter, r *http.Request) {
	search := r.URL.Query().Get("search")
	pageStr := r.URL.Query().Get("page")
	category := r.URL.Query().Get("category")

	page, err := strconv.Atoi(pageStr)
	responseResult, err := Usecases{}.SearchProducts(search, category, page)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(fmt.Errorf("Error getting products: %w", err).Error()))
		return
	}

	resultJson, _ := json.Marshal(responseResult)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}

func PutProductImage(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	sku := params["sku"]
	// Get image bytes from body request
	file, header, _ := r.FormFile("image")
	filetype := header.Header.Get("Content-Type")

	if filetype != "image/jpeg" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid image type"))
		return
	}

	imageResult, err := Usecases{}.AddImageToProduct(sku, file)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Errorf("Error adding image to Product: %w", err).Error()))
		return
	}

	responseResult := responses.Response{Data: imageResult}
	resultJson, _ := json.Marshal(responseResult)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}
