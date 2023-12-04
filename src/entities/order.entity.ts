import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AddressEntity } from './address.entity';
import { OrderStatusEnum } from 'src/shared/constants/order_status';

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
  })
  paymentId: string;

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
  createdAt: number;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
  })
  updatedAt: number;

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
}
