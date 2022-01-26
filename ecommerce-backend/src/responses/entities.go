package responses

type Response struct {
	Data interface{} `json:"data"`
}

type PaginatedResponse struct {
	Page       int         `json:"page"`
	TotalPages int         `json:"totalPages"`
	TotalItems int         `json:"totalItems"`
	Data       interface{} `json:"data"`
}
