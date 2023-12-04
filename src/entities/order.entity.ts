import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AddressEntity } from './address.entity';
import { OrderStatusEnum } from 'src/shared/constants/order_status';
import { ItemEntity } from './item.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
  })
  id: string;

  @Column({
    name: 'totalPrice',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPrice: number;

  @Column({
    name: 'orderName',
    type: 'varchar',
  })
  orderName: string;

  @Column({
    name: 'paymentId',
    type: 'uuid',
    nullable: true,
  })
  paymentId?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatusEnum,
  })
  status: OrderStatusEnum;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
  })
  createdAt: string;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
  })
  updatedAt: string;

  @Column({
    name: 'addressId',
    type: 'uuid',
  })
  addressId: string;

  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: 'addressId' })
  address: AddressEntity;

  @Column({
    name: 'userId',
    type: 'uuid',
  })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToMany(() => ItemEntity, (item) => item.orders)
  @JoinTable({
    name: 'items_orders',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'itemId', referencedColumnName: 'id' },
  })
  items: ItemEntity[];
}
