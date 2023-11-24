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
            name: 'itemId',
            type: 'smallint',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('items_users', [
      new TableForeignKey({
        name: 'FKItemUser',
        columnNames: ['itemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
      new TableForeignKey({
        name: 'FKUserItem',
        columnNames: ['userId'],
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
