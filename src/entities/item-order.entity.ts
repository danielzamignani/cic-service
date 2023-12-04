import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ItemEntity } from './item.entity';
import { OrderEntity } from './order.entity';

@Entity('items_orders')
export class ItemOrderEntity {
  @Column({
    name: 'quantity',
    type: 'smallint',
    nullable: false,
  })
  quantity: number;

  @PrimaryColumn()
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @PrimaryColumn()
  itemId: number;

  @ManyToOne(() => ItemEntity, (item) => item.orders)
  @JoinColumn({ name: 'itemId' })
  item: ItemEntity;
}
