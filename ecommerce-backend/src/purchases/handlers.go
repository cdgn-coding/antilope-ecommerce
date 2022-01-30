package purchases

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/responses"
	"github.com/gorilla/mux"
)

func CreateProductPurchase(w http.ResponseWriter, r *http.Request) {
	var responseResult responses.Response
	var err error

	params := mux.Vars(r)
	userId := params["userId"]
	productSku := params["productSku"]

	responseResult, err = usecases{}.BuyProduct(userId, productSku)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(fmt.Errorf("Error processing purchase: %w", err).Error()))
		return
	}

	resultJson, _ := json.Marshal(responseResult)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resultJson))
}
