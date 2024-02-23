import axios from "axios";
import { AppError } from "@utils/appError";

const api = axios.create({
   baseURL: process.env.baseURL
})

api.interceptors.response.use(response => response, error => {
   if(error.response && error.response.data.message){
      return Promise.reject(new AppError(error.response.data.message))
   } else {
      return Promise.reject(error)
   }
})

export { api }