import { Router }  from "express";
import { OrderController } from "../controller/OrderController";
import { Authorized } from "../middleware/Authorization";

const router = Router();
const orderController = new OrderController();
const authorized = new Authorized();

router.get('/', authorized.handle, orderController.index);
router.get('/:id', authorized.handle, orderController.show);
router.post('/', authorized.handle, orderController.store);

export {
    router as orderRouter
}
