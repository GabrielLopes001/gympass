import { z } from "zod";

export const profileSchema = z.object({
   name: z.string().default('Gabriel'),
   old_password: z.string( {required_error: 'Informe sua senha atual'} ),
   new_password: z.string( {required_error: 'Informe uma senha'} )
     .min(6, { message: 'A senha deve ter no minímo 6 digítos'} ),
   password_confirm: z.string( {required_error: 'Confirme a Senha'} ),
 }).refine(({new_password,password_confirm}) => new_password === password_confirm, {
   message: 'A confirmação de senha não confere'
 })
 
 export type ProfileSchema = z.infer<typeof profileSchema>;