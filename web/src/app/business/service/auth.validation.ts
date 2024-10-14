import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string(),
  password: z.string()
});

export type SignInRequsetBody = z.infer<typeof SignInFormSchema>;