package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/keyauth"
)

func validateAPIKey(c *fiber.Ctx, key string) (bool, error) {
	return true, nil
}

func Auth() fiber.Handler {
	return keyauth.New(keyauth.Config{
		// SuccessHandler: func(c *fiber.Ctx) error {
		// 	return c.Next()
		// },
		// ErrorHandler: func(c *fiber.Ctx, err error) error {
		// 	if err == keyauth.ErrMissingOrMalformedAPIKey {
		// 		return c.Status(fiber.StatusUnauthorized).SendString(fmt.Sprintf("Not Authorized: %s", err.Error()))
		// 	}
		// 	return c.Status(fiber.StatusUnauthorized).SendString("Invalid or expired API Key")
		// },
		Validator: validateAPIKey,
		KeyLookup: "cookie:authjs.session-token",
	})
}
