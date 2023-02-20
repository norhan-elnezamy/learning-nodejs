import { Router }  from "express";
import { UserController } from "../controller/UserController";
import { Authorized } from "../middleware/Authorization";

const router = Router();
const orderController = new UserController();
const authorized = new Authorized();

router.get('/profile', authorized.handle, orderController.profile);

export {
    router as userRouter
}
