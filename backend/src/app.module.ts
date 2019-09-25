import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ItemsModule } from './items/items.module';

import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

@Module({
  imports: [ItemsModule, MongooseModule
    .forRoot('mongodb+srv://danya:ODMRohRLxWEIDNLm@cluster0-xr3ji.mongodb.net/nestjs-todolist?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_FILTER,
    useClass: HttpErrorFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  }],
})
export class AppModule {}
