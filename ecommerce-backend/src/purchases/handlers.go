package purchases

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
	"github.com/gorilla/mux"
)

func CreateProductPurchase(w http.ResponseWriter, r *http.Request) {
	var purchase *Purchase
	var err error

	params := mux.Vars(r)
	userId := params["userId"]
	productSku := params["productSku"]

	purchase, err = Usecases{}.BuyProduct(userId, productSku)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Errorf("Error processing purchase: %w", err).Error()))
		return
	}

	responseResult := responses.Response{Data: purchase}
	resultJson, _ := json.Marshal(responseResult)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}

func CreateCartPurchase(w http.ResponseWriter, r *http.Request) {
	var purchase *Purchase
	var err error

	params := mux.Vars(r)
	userId := params["userId"]

	purchase, err = Usecases{}.BuyCart(userId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Errorf("Error processing purchase: %w", err).Error()))
		return
	}

	responseResult := responses.Response{Data: purchase}
	resultJson, _ := json.Marshal(responseResult)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}

func ReceiveMercadoPagoNotification(w http.ResponseWriter, r *http.Request) {
	topic := r.URL.Query().Get("topic")
	id := r.URL.Query().Get("id")

	err := Usecases{}.ReceiveMercadoPagoNotification(topic, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Errorf("Error processing purchase: %w", err).Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
}
