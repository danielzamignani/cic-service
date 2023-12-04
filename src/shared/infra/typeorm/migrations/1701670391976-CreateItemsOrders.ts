import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateItemsOrders1701670391976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items_orders',
        columns: [
          {
            name: 'quantity',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'itemId',
            type: 'smallint',
            isPrimary: true,
          },
          {
            name: 'orderId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('items_orders', [
      new TableForeignKey({
        name: 'FKItemOrder',
        columnNames: ['itemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
      new TableForeignKey({
        name: 'FKOrderItem',
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('items_order', 'FKItemOrder');

    await queryRunner.dropForeignKey('items_order', 'FKOrderItem');

    await queryRunner.dropTable('items_order');
  }
}
