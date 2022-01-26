package main

import (
	"log"
	"net/http"
	"os"

	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/products"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Pong!\n"))
}

func main() {
	godotenv.Load()
	log.SetOutput(os.Stdout)
	log.Printf("Starting server. Environment: %s", os.Getenv("env"))
	r := mux.NewRouter()
	r.HandleFunc("/ping", pingHandler)
	r.Handle("/products/{sku}", http.HandlerFunc(products.PutProduct)).Methods("PUT")
	r.Handle("/products/{sku}", http.HandlerFunc(products.GetProduct)).Methods("GET")
	r.Handle("/{products:products(?:\\/)?}", http.HandlerFunc(products.SearchProducts)).Methods("GET")
	log.Fatal(http.ListenAndServe(":3000", r))
}
