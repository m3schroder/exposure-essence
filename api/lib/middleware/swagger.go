package middleware

import (
	"fmt"

	"github.com/gofiber/contrib/swagger"
	"github.com/gofiber/fiber/v2"
)

func Swagger(version string) fiber.Handler {
	config := swagger.Config{
		FilePath: fmt.Sprintf("./lib/docs/%s/swagger.yaml", version),
		Path:     "docs",
		Title:    "Fiber API documentation",
		CacheAge: 500,
	}
	return swagger.New(config)
}
