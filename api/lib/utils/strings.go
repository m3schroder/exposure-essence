package utils

import (
	"bytes"
	"text/template"

	"github.com/gofiber/fiber/v2"
)

func Fmt(tmpl string, input map[string]string) string {
	// Create a new template and parse the template string
	t, err := template.New("greeting").Parse(tmpl)
	if err != nil {
		panic(err)
	}
	var b bytes.Buffer
	// Execute the template with the provided data
	err = t.Execute(&b, input)
	if err != nil {
		Error(fiber.StatusBadRequest, "Unabled to format this string", err)
	}
	return b.String()
}
