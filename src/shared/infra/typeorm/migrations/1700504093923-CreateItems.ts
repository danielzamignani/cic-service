import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItems1700504093923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'smallint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.query(`
            INSERT INTO 
                items (id, name, price, "imageUrl")
            VALUES 
                (1, 'Café com Leite', 5.00, 'https://static.tuasaude.com/media/article/tk/av/cafe-com-leite-uma-mistura-perigosa_12061_l.jpg' ),
                (2, 'Cappuccino', 7.00, 'https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-CAPPUCCINO-BANANA-SESAME-SEEDS.jpg' ),
                (3, 'Pão de Queijo', 5.00, 'https://static.itdg.com.br/images/1200-630/1b388cd05b842609f91603072d894643/pao-de-queijo-facil-e-delicioso.png' ),
                (4, 'Latte Macchiato', 7.00, 'https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Latte-Macchiato.jpg' ),
                (5, 'Cupcake', 6.50, 'https://uploads.metropoles.com/wp-content/uploads/2022/04/08092542/Forma-de-cupcake.jpg' ),
                (6, 'Donuts', 8.00, 'https://conteudo.imguol.com.br/c/entretenimento/97/2021/08/20/donuts-1629478859400_v2_4x3.jpg' ),
                (7, 'Café Expresso', 6.50, 'https://dhg1h5j42swfq.cloudfront.net/2017/01/18142635/caf%C3%A9-expresso.png' )
            ;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
