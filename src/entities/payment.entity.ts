import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { PaymentMethodEnum } from 'src/shared/constants/payment-method';

@Entity('payments')
export class PaymentEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
  })
  id: string;

  @Column({
    name: 'cardHolderName',
    type: 'varchar',
    nullable: false,
  })
  cardHolderName: string;

  @Column({
    name: 'cardHolderDocument',
    type: 'varchar',
    length: 11,
    nullable: false,
  })
  cardHolderDocument: string;

  @Column({
    name: 'cardNumber',
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  cardNumber: string;

  @Column({
    name: 'expirationDate',
    type: 'varchar',
    length: 7,
    nullable: false,
  })
  expirationDate: string;

  @Column({
    name: 'paymentMethod',
    type: 'enum',
    enum: PaymentMethodEnum,
  })
  paymentMethod: PaymentMethodEnum;

  @Column({
    name: 'orderId',
    type: 'uuid',
  })
  orderId: string;

  @OneToOne(() => OrderEntity)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;
}
