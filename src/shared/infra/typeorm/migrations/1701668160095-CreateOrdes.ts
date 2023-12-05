import { OrderStatusEnum } from 'src/shared/constants/order_status';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrdes1701668160095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'totalPrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'orderName',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'enum',
            enum: [
              OrderStatusEnum.NEW,
              OrderStatusEnum.CANCELED,
              OrderStatusEnum.PAYED,
              OrderStatusEnum.REFUNDED,
              OrderStatusEnum.SHIPPED,
            ],
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
          {
            name: 'addressId',
            type: 'uuid',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('orders', [
      new TableForeignKey({
        name: 'FKAddressOrder',
        columnNames: ['addressId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'address',
      }),
      new TableForeignKey({
        name: 'FKUserOrder',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'FKAddressOrder');

    await queryRunner.dropForeignKey('orders', 'FKUserOrder');

    await queryRunner.dropTable('orders');
  }
}
