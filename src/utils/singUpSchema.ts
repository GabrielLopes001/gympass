import { z } from "zod";

export const singUpSchema = z.object({
   name: z.string( {required_error: 'O Nome é Obrigatório'} )
     .min(3, { message: 'O nome precisa ter no minímo 3 letras'}),
   email: z.string( {required_error: 'O E-mail é Obrigatório'} )
     .email( {message: 'E-mail inválido' }),
   password: z.string( {required_error: 'Informe uma senha'} )
     .min(6, { message: 'A senha deve ter no minímo 6 digítos'} ),
   password_confirm: z.string( {required_error: 'Confirme a Senha'} ),
 }).required().refine(({password,password_confirm}) => password === password_confirm, {
   message: 'A confirmação de senha não confere', 
   path: ["Confirm"]
 })
 
 export type SingUpSchema = z.infer<typeof singUpSchema>;