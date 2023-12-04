import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
  })
  id: string;

  @Column({
    name: 'zipCode',
    type: 'char',
    length: 8,
  })
  zipCode: string;

  @Column({
    name: 'street',
    type: 'varchar',
  })
  street: string;

  @Column({
    name: 'uf',
    type: 'char',
    length: 2,
  })
  uf: string;

  @Column({
    name: 'city',
    type: 'varchar',
  })
  city: string;

  @Column({
    name: 'number',
    type: 'varchar',
    nullable: true,
  })
  number?: string;

  @Column({
    name: 'complement',
    type: 'varchar',
    nullable: true,
  })
  complement?: string;

  @Column({
    name: 'userId',
    type: 'uuid',
  })
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
