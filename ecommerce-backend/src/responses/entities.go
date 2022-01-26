package responses

type Response struct {
	data interface{}
}

type PaginatedResponse struct {
	page       int
	totalPages int
	totalItems int
	data       interface{}
}
