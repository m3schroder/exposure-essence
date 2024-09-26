package router

import (
	"github.com/gofiber/fiber/v2"

	"app/impl"
	"app/lib/utils"
)

// SetupRoutes setup router api
func SetupRoutes(app *fiber.App) {
	// Base
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("ok")
	})
	m := app.Group("/mail")
	{
		m.Post("", utils.SendMail)
	}
	c := app.Group("/contact")
	{
		// c.Get("", impl.HandleContactList)
		c.Post("", impl.HandleContactAdd)
	}
	i := app.Group("/media")
	{
		i.Get("/gallery/:container", impl.GetBlobMeta)
		i.Get("/galleries", impl.GetContainers)
		i.Get("/migrate", impl.Migrate)
	}
}
