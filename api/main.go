package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"app/lib/middleware"
	"app/router"
)

func main() {
	// db := data.Db()

	// db.AutoMigrate(&data.Contact{})

	app := fiber.New(fiber.Config{
		Prefork:       false,
		CaseSensitive: true,
		StrictRouting: true,
		ServerHeader:  "Exess",
		AppName:       "Exess Backend",
	})

	app.Use(recover.New())
	app.Use(middleware.Logger())
	app.Use(middleware.Cors())
	// app.Use(middleware.Swagger("v1"))

	// Health and Monitoring
	app.Get("/monitor", middleware.Monitor())
	app.Get("/ping", func(c *fiber.Ctx) error {
		return c.SendString("Pong")
	})

	router.SetupRoutes(app)

	err := app.Listen(":8080")
	if err != nil {
		fmt.Println("Some error starting the server", err)
		log.Fatal(err)
	}
}
