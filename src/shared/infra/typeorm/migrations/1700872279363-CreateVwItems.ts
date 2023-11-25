import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVwItems1700872279363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE VIEW "vw_items" AS
            SELECT 
                i.id,
                i.name,
                i.price,
                i."imageUrl",
                ROUND(COALESCE(AVG(ir.stars), 0)) AS stars
            FROM items i
            LEFT JOIN items_ratings ir
                ON ir."itemId" = i.id
            GROUP BY i.id
            ;  
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropView('vw_items');
  }
}
