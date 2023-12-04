import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAddress1701665140800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'zipCode',
            type: 'char',
            length: '8',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'char',
            length: '2',
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('address', [
      new TableForeignKey({
        name: 'FKUserAddress',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('address', 'FKUserAddress');

    await queryRunner.dropTable('address');
  }
}
