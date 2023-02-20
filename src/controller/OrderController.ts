import {Order} from "../entity/Order";
import {Product} from "../entity/Product";
import {Request, Response} from "express";
import {Auth} from "../helper/Auth";

export class OrderController {

    async index(request: Request, response: Response){
        const auth = new Auth(request);

        let orders = await Order.findBy({
            user: {
                id: auth.id()
            }
        });
        return response.status(200).json(orders);
    }

    async show(request: Request, response: Response) {
        const auth = new Auth(request);

        try {
            let order = await Order.findOneOrFail({
                where: {
                    id: parseInt(request.params.id),
                    user: {
                        id: auth.id()
                    }
                }
            });
            return response.status(200).json(order);
        } catch (error: any) {
            return response.status(404).json({
                message: "Order not found."
            });
        }
    }

    async store(request: Request, response: Response) {
        const auth = new Auth(request);

        const {productId, quantity} = request.body;

        let product = await Product.findOneBy({id: productId});

        if (product) {
            const order = Order.create({
                total: quantity * product.price,
                user: {
                    id: auth.id()
                },
                orderProducts: [
                    {
                        quantity: quantity,
                        product: {
                            id: product.id
                        }
                    }
                ]
            });
            await order.save();

            return response.status(201).json({
                message: "order created successfully",
                order: order
            });
        }
        return response.status(400).json({
            error: "Invalid selected product",
        });
    }
}