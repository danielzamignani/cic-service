import { PaymentMethodEnum } from 'src/shared/constants/payment-method';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePayment1701748543669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'cardHolderName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cardHolderDocument',
            type: 'varchar',
            length: '11',
            isNullable: false,
          },
          {
            name: 'cardNumber',
            type: 'varchar',
            length: '16',
            isNullable: false,
          },
          {
            name: 'expirationDate',
            type: 'varchar',
            length: '7',
            isNullable: false,
          },
          {
            name: 'paymentMethod',
            type: 'enum',
            enum: [PaymentMethodEnum.CREDIT, PaymentMethodEnum.DEBIT],
          },
          {
            name: 'orderId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('payments', [
      new TableForeignKey({
        name: 'FKOrderPayment',
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('payments', 'FKOrderPayment');

    await queryRunner.dropTable('payments');
  }
}
