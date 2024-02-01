import { z } from "zod";

export const profileSchema = z.object({
   name: z.string().default('Gabriel'),
   email: z.string().email(),
   old_password: z.string().optional(),
   password: z.string()
     .min(6, { message: 'A senha deve ter no minímo 6 digítos'} ),
   password_confirm: z.string(),
 }).superRefine(({password,password_confirm}) => password === password_confirm)
 
 export type ProfileSchema = z.infer<typeof profileSchema>;