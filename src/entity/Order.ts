import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Generated,
    OneToMany,
} from "typeorm";

import {User} from "./User";
import {Product} from "./Product";
import {OrderProduct} from "./OrderProduct";

@Entity('orders')
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated("uuid")
    uuid: string

    @Column()
    total: number

    @ManyToOne(type => User, user => user.orders)

    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'orders_user_id_foreign_key'
    })
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.order)
    orderProducts: OrderProduct[]
}
