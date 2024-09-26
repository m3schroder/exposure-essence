package utils

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func Error(code int, message string, errs ...error) error {
	if len(errs) > 0 {
		err := errs[0]
		return fiber.NewError(code, fmt.Sprintf("%s | %v", message, err))
	}
	err := fiber.NewError(code, message)
	fmt.Println(err)
	return err
}
