import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {OrderProduct} from "./OrderProduct";

@Entity('products')
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.product)
    orderProducts: OrderProduct[]
}
