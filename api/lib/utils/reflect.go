package utils

import (
	"fmt"
	"reflect"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

// StructToMap converts a struct to a map[string]interface{}
// where the keys are the field names and the values are the corresponding field values.
func Stp(s interface{}) map[string]interface{} {
	// Create a map to hold the key-value pairs.
	result := make(map[string]interface{})

	// Get the underlying value of the interface.
	v := reflect.ValueOf(s)

	// Handle the case where s is a pointer and indirect it to get the actual value.
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}

	// Iterate over the struct fields.
	for i := 0; i < v.NumField(); i++ {
		// Get the field name and value.
		fieldName := v.Type().Field(i).Name
		fieldValue := v.Field(i).Interface()

		// Add to the map.
		result[fieldName] = fieldValue
	}

	return result
}

func Interpolate(s interface{}) (string, error) {
	m := Stp(s)
	str := ""
	for key, value := range m {
		v := reflect.ValueOf(value)
		if v.Kind() == reflect.Ptr {
			v = v.Elem()
		}
		strVal, err := ConvertToString(value)
		if err != nil {
			return "", err
		}
		str = strings.ReplaceAll(str, "{"+key+"}", *strVal)
	}
	return str, nil

}

func ConvertToString(value interface{}) (*string, error) {
	s := ""
	switch v := value.(type) {
	case int:
		s = strconv.Itoa(v)
	case float64:
		s = strconv.FormatFloat(v, 'f', -1, 64)
	case string:
		s = v
	case bool:
		s = strconv.FormatBool(v)
	default:
		return nil, fiber.NewError(fiber.StatusInternalServerError, fmt.Sprintf("Unabled to convert field of type %s to string", v))
	}
	return &s, nil
}
