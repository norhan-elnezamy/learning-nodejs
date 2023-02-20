import {Request, Response} from "express";
import {Auth} from "../helper/Auth";

export class UserController {


    async profile(request: Request, response: Response)
    {
        const auth = new Auth(request);
        const user = await auth.user();

        return response.status(200).json(user);

    }

}