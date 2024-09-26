package impl

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

	"app/data"
)

func HandleContactAdd(c *fiber.Ctx) error {
	body := new(data.Contact)
	contactRepo := data.NewRepo(body)

	if err := c.BodyParser(body); err != nil {
		return err
	}

	contacts, err := contactRepo.CreateOrUpdate(*body, "email = ?", body.Email)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return c.JSON(contacts)
}

// func HandleContactList(c *fiber.Ctx) error {
// 	contactRepo := data.NewRepo()
// 	body := new(data.Contact)

// 	if err := c.BodyParser(body); err != nil {
// 		return err
// 	}

// 	contacts, err := contactRepo.Find(body)
// 	if err != nil {
// 		fmt.Println(err)
// 		return err
// 	}
// 	return c.JSON(contacts)
// }
