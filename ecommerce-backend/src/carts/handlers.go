package carts

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func GetCart(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]
	response, err := usecases{}.GetCartById(id)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(err.Error()))
		return
	}

	responseJson, _ := json.Marshal(response)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(responseJson))
}

func PutProductQuantity(w http.ResponseWriter, r *http.Request) {
	var cartItem CartItem
	err := json.NewDecoder(r.Body).Decode(&cartItem)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	params := mux.Vars(r)
	id := params["id"]
	sku := params["sku"]
	response, err := usecases{}.PutProductQuantity(id, sku, cartItem)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	responseJson, _ := json.Marshal(response)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(responseJson))
}
