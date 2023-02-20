import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn, ManyToOne
} from "typeorm";

import {Product} from "./Product";
import {Order} from "./Order";
import {User} from "./User";

@Entity('order_products')
export class OrderProduct extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @ManyToOne(type => Order, order => order.orderProducts)

    @JoinColumn({
        name: 'order_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'order_products_order_id_foreign_key'
    })
    order: Order

    @ManyToOne(type => Product, product => product.orderProducts)

    @JoinColumn({
        name: 'product_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'order_products_product_id_foreign_key'
    })
    product: Product

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
