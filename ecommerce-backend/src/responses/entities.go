package responses

type Response struct {
	Data interface{} `json:"data"`
}

type PaginatedResponse struct {
	Page       int64       `json:"page"`
	TotalPages int64       `json:"totalPages"`
	TotalItems int64       `json:"totalItems"`
	Data       interface{} `json:"data"`
}
