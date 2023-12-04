import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1700705684243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'email',
            isUnique: true,
            type: 'varchar',
            length: '30',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '60',
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
