import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ItemRatingEntity } from './item-rating.entity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    type: 'smallint',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    name: 'imageUrl',
    type: 'varchar',
  })
  imageUrl: string;

  @ManyToMany(() => UserEntity, (user) => user.items)
  @JoinTable({
    name: 'items_users',
    joinColumn: { name: 'itemId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  users: UserEntity[];

  @OneToMany(() => ItemRatingEntity, (itemRating) => itemRating.item)
  ratings: ItemRatingEntity[];
}
