import { DataSource } from "typeorm"
import { Config } from './helper/config';
import {User} from "./entity/User";
import {Product} from "./entity/Product";
import {Order} from "./entity/Order";
import {OrderProduct} from "./entity/OrderProduct";


export const DBConnection = new DataSource({

    type: Config.get('DB_CONNECTION_DRIVER'),
    host: Config.get('DB_CONNECTION_HOST'),
    port: Config.get('DB_CONNECTION_PORT'),
    username: Config.get('DB_CONNECTION_USER'),
    password: Config.get('DB_CONNECTION_PASSWORD'),
    database: Config.get('DB_CONNECTION_DATABASE'),
    synchronize: true,
    entities: [
        User,
        Product,
        Order,
        OrderProduct
    ],
})
