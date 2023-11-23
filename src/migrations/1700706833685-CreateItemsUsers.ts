import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateItemsUsers1700706833685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items_users',
        columns: [
          {
            name: 'itemsId',
            type: 'smallint',
            isPrimary: true,
          },
          {
            name: 'usersId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('items_users', [
      new TableForeignKey({
        name: 'FKItemUser',
        columnNames: ['itemsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
      new TableForeignKey({
        name: 'FKUserItem',
        columnNames: ['usersId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('items_users', 'FKItemUser');

    await queryRunner.dropForeignKey('items_users', 'FKUserItem');

    await queryRunner.dropTable('items_users');
  }
}
