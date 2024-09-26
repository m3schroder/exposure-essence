package data

import (
	"reflect"

	"github.com/kr/pretty"
	"gorm.io/gorm"
)

// Model is a generic interface that any GORM model must implement.
type Model interface {
	Meta() gorm.Model
	SetMeta(gorm.Model)
}

// Repository is a generic struct for handling database operations.
type Repository[T Model] struct {
	db    *gorm.DB
	model string
}

// NewRepository creates a new repository.
func NewRepo[T Model](model *T) *Repository[T] {
	name := reflect.TypeOf(model).Elem().Name()
	return &Repository[T]{db: Db(), model: name}
}

// Add adds a new model to the database and returns the model or an error.
func (r *Repository[T]) Add(model T) (*T, error) {
	err := r.db.Create(&model).Error
	if err != nil {
		return nil, err
	}
	return &model, nil
}

// FindByID finds a model by its ID.
func (r *Repository[T]) FindByID(id interface{}) (*T, error) {
	var model T
	err := r.db.First(&model, id).Error
	if err != nil {
		return nil, err
	}
	return &model, nil
}

// CreateOrUpdateContact creates a new contact or updates an existing contact based on email
func (r *Repository[T]) CreateOrUpdate(model T, query string, value any) (*T, error) {
	curr := model
	if err := r.db.First(&curr, query, value).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			res := r.db.Create(&curr)
			if res.Error != nil {
				return nil, res.Error
			}
			pretty.Printf("Created %s %s\n", res.RowsAffected, r.model)
		} else {
			return nil, err
		}
	} else {
		model.SetMeta(curr.Meta())
		res := r.db.Model(&model).Where(query, value).Updates(&model)
		if res.Error != nil {
			return nil, res.Error
		}
		pretty.Printf("Updated %d %s\n", res.RowsAffected, r.model)
	}
	return &model, nil
}

// Update updates an existing model in the database.
func (r *Repository[T]) Update(model T) (*T, error) {
	err := r.db.Save(&model).Error
	if err != nil {
		return nil, err
	}
	return &model, nil
}

// Delete deletes a model from the database.
func (r *Repository[T]) Delete(model T) error {
	return r.db.Delete(&model).Error
}
