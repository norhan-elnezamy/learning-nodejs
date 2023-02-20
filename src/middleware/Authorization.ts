import {Config} from "../helper/config";
import jwt, {JwtPayload}  from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export interface AuthorizedRequest extends Request {

    token: string | JwtPayload;
}

export class Authorized {
    handle(request: Request, response: Response, next: NextFunction) {
        try {
            let jwtSecretKey = Config.get('JWT_SECRET_KEY');
            const token = request.header('Authorization')?.replace('Bearer ', '') ?? '';

            const verified = jwt.verify(token, jwtSecretKey);

            if(verified) {
                (request as AuthorizedRequest).token = verified;
                return next();
            }
            return response.status(401).json({
                error: "Unauthorized"
            });

        } catch (error) {
            return response.status(401).send(error);
        }
    }
}