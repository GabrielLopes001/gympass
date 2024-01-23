import { z } from "zod";

export const singInSchema = z.object({
   email: z.string( {required_error: 'O E-mail é Obrigatório'} )
     .email( {message: 'E-mail inválido' }),
   password: z.string( {required_error: 'Informe uma senha'} )
 }).required()
 
 export type SingInSchema = z.infer<typeof singInSchema>;