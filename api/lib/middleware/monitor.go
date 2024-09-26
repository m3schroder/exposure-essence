package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
)

func Monitor() fiber.Handler {
	mon := monitor.New(monitor.Config{Title: "Strukt API Monitor"})
	return mon
}
