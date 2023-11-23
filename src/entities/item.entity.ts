import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

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
    joinColumn: { name: 'itemsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'usersId', referencedColumnName: 'id' },
  })
  users: UserEntity[];
}
