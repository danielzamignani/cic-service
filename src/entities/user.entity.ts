import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { ItemEntity } from './item.entity';
import { ItemRatingEntity } from './item-rating.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 30,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 60,
  })
  password: string;

  @Column({
    name: 'isAdmin',
    type: 'boolean',
    default: false
  })
  isAdmin: boolean;

  @ManyToMany(() => ItemEntity, (item) => item.users)
  items: ItemEntity[];

  @OneToMany(() => ItemRatingEntity, (itemRating) => itemRating.user)
  ratings: ItemRatingEntity[];
}
