package main

import (
	"log"
	"net/http"
	"os"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
	"github.com/gorilla/mux"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Pong!\n"))
}

func main() {
	log.SetOutput(os.Stdout)
	log.Printf("Starting server. Environment: %s", os.Getenv("env"))
	r := mux.NewRouter()
	r.HandleFunc("/ping", pingHandler)
	r.Handle("/products/{sku}", http.HandlerFunc(products.PutProduct)).Methods("PUT")
	log.Fatal(http.ListenAndServe(":3000", r))
}
