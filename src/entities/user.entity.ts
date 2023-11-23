import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 100
    })
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 30
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 30
    })
    password: string;
}