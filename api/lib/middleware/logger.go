package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Logger() fiber.Handler {
	log := logger.New(logger.Config{
		CustomTags: map[string]logger.LogFunc{
			"custom_tag": func(output logger.Buffer, c *fiber.Ctx, data *logger.Data, extraParam string) (int, error) {
				return output.WriteString("it is a custom tag")
			},
		},
	})
	return log
}
