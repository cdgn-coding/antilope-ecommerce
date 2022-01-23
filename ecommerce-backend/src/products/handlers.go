package products

import (
	"encoding/json"
	"net/http"
)

func PutProduct(w http.ResponseWriter, r *http.Request) {
	var product Product
	err := json.NewDecoder(r.Body).Decode(&product)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Product created successfully!\n"))
}
