import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConnection } from './shared/infra/typeorm/ormconfig';

@Module({
  imports: [typeORMConnection],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
