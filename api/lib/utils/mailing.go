package utils

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type Mail struct {
	From     string   `json:"from"`
	FromName string   `json:"fromName"`
	To       []string `json:"to"`
	Subject  string   `json:"subject"`
	Html     string   `json:"html"`
}

func SendMail(c *fiber.Ctx) error {
	m := new(Mail)

	if err := c.BodyParser(m); err != nil {
		return err
	}
	from := mail.NewEmail(m.FromName, m.From)

	subject := m.Subject

	// Create the personalization object for each recipient
	personalizations := []*mail.Personalization{}
	for _, recipient := range m.To {
		to := mail.NewEmail("To", recipient)
		p := mail.NewPersonalization()
		p.AddTos(to)
		personalizations = append(personalizations, p)
	}

	// Create the content of the email
	content := mail.NewContent("text/plain", m.Html)

	// Create the email message
	message := mail.NewV3MailInit(from, subject, nil, content)
	message.Personalizations = personalizations

	// client := sendgrid.NewSendClient(config.Get("sg_key"))
	// _, err := client.Send(message)
	// if err != nil {
	// 	log.Println(err)
	// 	return err
	// }
	return nil
}
