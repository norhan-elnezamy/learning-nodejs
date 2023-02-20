import {Router}  from "express";
import {ProductController} from "../controller/ProductController";

const router = Router();
const product = new ProductController();

router.get('/', product.index);
router.get('/:id', product.show);

export {
    router as productRouter
}
