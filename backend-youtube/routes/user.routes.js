import { loginController, signUpController } from "../controller/user.controller.js";

export function userRoutes(app){

 app.post('/signup' ,signUpController)
 app.post('/login' ,loginController)

}