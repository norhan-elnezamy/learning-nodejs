import { Product } from "../entity/Product";
import {Request, Response} from "express";

export class ProductController {
    async index(request: Request, response: Response) {
        console.log("get products api request");
        let products = await Product.find();

        return response.status(200).send(products);
    }

    async show(request: Request, response: Response) {
        let product = await Product.findOneBy({id: parseInt(request.params.id)});
        if (product) {
            return response.status(200).json(product);
        }
        return response.status(404).json({
            error : "Product not found."
        });

    }
}