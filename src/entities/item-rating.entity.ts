import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ItemEntity } from './item.entity';

@Entity('items_ratings')
export class ItemRatingEntity {
  @Column({
    name: 'stars',
    type: 'decimal',
    precision: 2,
    scale: 1,
  })
  stars: string;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @PrimaryColumn()
  itemId: number;

  @ManyToOne(() => ItemEntity, (item) => item.ratings)
  @JoinColumn({ name: 'itemId' })
  item: ItemEntity;
}
