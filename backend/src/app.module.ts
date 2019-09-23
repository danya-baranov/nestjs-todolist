import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';

@Module({
  imports: [ItemsModule, MongooseModule
    .forRoot('mongodb+srv://danya:ODMRohRLxWEIDNLm@cluster0-xr3ji.mongodb.net/nestjs-todolist?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
