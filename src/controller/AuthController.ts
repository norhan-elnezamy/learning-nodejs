import {Request, Response} from "express";
import {Auth} from "../helper/Auth";

export class AuthController {

    async login(request: Request, response: Response) {
        const {email, password} = request.body;
        const auth = new Auth(request);
        try {
            const token = await auth.attempt(email, password);
            return response.status(200).json({
                token: token
            });

        } catch (error: any) {
            return response.status(400).json({
                message: error.message
            });
        }
    }

    register(request: Request, response: Response) {

    }

}