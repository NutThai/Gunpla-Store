package entity

type Tool struct {
	ProductId   string   `json:"productId"`
	Images      []string `json:"images"`
	Name        string   `json:"name"`
	Type        string   `json:"type"`
	Brand       string   `json:"brand"`
	Price       int64    `json:"price"`
	Stock       int      `json:"stock"`
	Description string   `json:"description"`
}
