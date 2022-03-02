package main

import (
	"log"
	"net/http"
	"os"

	"github.com/cdgn-coding/antilope-ecommerce/backend/src/carts"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/clients"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/products"
	"github.com/cdgn-coding/antilope-ecommerce/backend/src/purchases"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Pong!\n"))
}

func main() {
	godotenv.Load()
	log.SetOutput(os.Stdout)
	log.Printf("Starting server. Environment: %s", os.Getenv("env"))
	clients.StartGormClient()
	r := mux.NewRouter()
	r.HandleFunc("/ping", pingHandler)
	r.Handle("/products/{sku}", http.HandlerFunc(products.PutProduct)).Methods("PUT")
	r.Handle("/products/{sku}", http.HandlerFunc(products.GetProduct)).Methods("GET")
	r.Handle("/{products:products(?:\\/)?}", http.HandlerFunc(products.SearchProducts)).Methods("GET")
	r.Handle("/products/{sku}/images", http.HandlerFunc(products.PutProductImage)).Methods("POST")
	r.Handle("/users/{id}/cart", http.HandlerFunc(carts.GetCart)).Methods("GET")
	r.Handle("/users/{id}/cart/items/{sku}", http.HandlerFunc(carts.PutProductQuantity)).Methods("PUT")
	r.Handle("/users/{id}/cart/items/{sku}", http.HandlerFunc(carts.DeleteProductFromCart)).Methods("DELETE")
	r.Handle("/users/{userId}/purchases", http.HandlerFunc(purchases.ListPurchases)).Methods("GET")
	r.Handle("/users/{userId}/purchases/products/{productSku}", http.HandlerFunc(purchases.CreateProductPurchase)).Methods("POST")
	r.Handle("/users/{userId}/purchases/cart", http.HandlerFunc(purchases.CreateCartPurchase)).Methods("POST")
	r.Handle("/purchases/notifications/mercadopago", http.HandlerFunc(purchases.ReceiveMercadoPagoNotification)).Methods("POST")
	log.Fatal(http.ListenAndServe(os.Getenv("HOST"), r))
}
