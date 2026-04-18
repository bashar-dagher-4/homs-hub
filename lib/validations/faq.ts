import { z } from "zod"

export const faqSchema = z.object({
  name: z.string().optional(),
  sector: z.union([
    z.literal("sports"),
    z.literal("health"),
    z.literal("education"),
  ]),
  question: z.string().min(10, "السؤال يجب أن يكون 10 أحرف على الأقل"),
})

export type FaqInput = z.infer<typeof faqSchema>