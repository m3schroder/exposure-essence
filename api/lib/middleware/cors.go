package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"app/lib/config"
)

func Cors() fiber.Handler {
	var ConfigDefault = cors.Config{
		Next:             nil,
		AllowOriginsFunc: nil,
		AllowOrigins:     config.Get("cors"),
		AllowMethods: strings.Join([]string{
			fiber.MethodGet,
			fiber.MethodPost,
			fiber.MethodHead,
			fiber.MethodPut,
			fiber.MethodDelete,
			fiber.MethodPatch,
		}, ","),
		AllowHeaders:     "*",
		AllowCredentials: true,
		ExposeHeaders:    "",
		MaxAge:           0,
	}
	n := cors.New(ConfigDefault)
	return n
}
