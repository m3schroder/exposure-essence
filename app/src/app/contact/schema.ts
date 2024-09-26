import { z } from "zod";

export const contactSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	company: z.string(),
	phone: z.string().optional(),  // Assuming pgtype.Text can be optional
	message: z.string().optional(),  // Assuming pgtype.Text can be optional
	budget: z.string().optional()  // Assuming pgtype.Text can be optional
});

export type ContactForm = z.infer<typeof contactSchema>