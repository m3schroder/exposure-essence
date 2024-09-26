package data

import (
	"gorm.io/gorm"
)

type Contact struct {
	gorm.Model
	Name    string
	Email   string
	Company string
	Phone   *string
	Message *string
	Budget  *string
}

func (c Contact) Meta() gorm.Model {
	return c.Model
}
func (c Contact) SetMeta(model gorm.Model) {
	c.Model = model
}
