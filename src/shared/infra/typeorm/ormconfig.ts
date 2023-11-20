import { TypeOrmModule } from "@nestjs/typeorm";

// ormconfig.ts
export const typeORMConnection = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST_NAME,
    port: +process.env.POSTGRES_HOST_PORT,
    username:process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true
});
