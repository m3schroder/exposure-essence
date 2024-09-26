package utils

import (
	"encoding/json"
	"fmt"
	"reflect"
)

func PrettyPrint(obj any) {
	b, _ := json.MarshalIndent(obj, "", "   ")
	fmt.Println(string(b))
}

type BaseModel interface {
}

// Function to map struct to map[string]*string
func ToMap[T BaseModel](st T) map[string]*string {
	result := make(map[string]*string)

	// Get the type of the struct
	t := reflect.TypeOf(st)

	// Get the value of the struct
	v := reflect.ValueOf(st)

	// Iterate through each field of the struct
	for i := 0; i < t.NumField(); i++ {
		// Get the field name
		field := t.Field(i).Name

		// Get the field value as string
		value := v.Field(i).Interface().(string)

		// Store the field name and a pointer to its value in the map
		result[field] = &value
	}

	return result
}
