import jwt, {JwtPayload}  from "jsonwebtoken";
import {AuthorizedRequest} from "../middleware/Authorization";
import {User} from "../entity/User";
import {Request} from "express";
import bcrypt from "bcrypt";
import {Config} from "./config";

export class Auth {
    public request: Request;

    constructor(request: Request) {
        this.request = request;
    }

    id(): number {
        const {token} = (this.request as AuthorizedRequest);
        const {userId} = (token as JwtPayload);

        return userId;
    }

    async user(): Promise<User | null> {
        return  await User.findOneBy({ id: this.id() });
    }

    async attempt(email: string, password: string): Promise<string> {

        const user = await User.findOneBy({ email: email });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return  this.generateToken({time: Date(), userId: user.id});
            }
        }

        throw Error("Invalid email or password");
    }

    generateToken(data: JwtPayload) {
        return  jwt.sign(data, Config.get('JWT_SECRET_KEY'));
    }
}