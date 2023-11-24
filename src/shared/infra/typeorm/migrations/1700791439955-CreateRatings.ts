import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRatings1700791439955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items_ratings',
        columns: [
          {
            name: 'stars',
            type: 'decimal',
            precision: 2,
            scale: 1,
          },
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

    await queryRunner.createForeignKeys('items_ratings', [
      new TableForeignKey({
        name: 'FKItemRating',
        columnNames: ['itemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
      }),
      new TableForeignKey({
        name: 'FKUserRating',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('items_ratings', 'FKItemRating');

    await queryRunner.dropForeignKey('items_ratings', 'FKUserRating');

    await queryRunner.dropTable('items_ratings');
  }
}
