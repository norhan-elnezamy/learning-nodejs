import express  from "express";
import { pagination } from 'typeorm-pagination'

import { DBConnection } from "./src/database";
import { Config } from "./src/helper/config";
import { productRouter } from "./src/routes/product"
import { orderRouter } from "./src/routes/order"
import { authRouter } from "./src/routes/auth";
import { userRouter } from "./src/routes/user";

const app = express();

const PORT = Config.get('PORT');


const main = () => {
    DBConnection.initialize().then(() => {
        console.log("Database connection has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

    app.use(express.json());

    app.use(pagination);

    app.use('/api/product', productRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);

    app.listen(PORT, () => {
        console.log(`express app running on port ${PORT}.`);
    });
}

main();
