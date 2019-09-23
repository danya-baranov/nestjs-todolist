import { ItemsController } from './items.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemSchema } from './item.model';
import { MorganModule } from 'nest-morgan';

@Module({
    imports: [MorganModule.forRoot(), MongooseModule.forFeature([{name: 'Item', schema: ItemSchema}])],
    controllers: [ ItemsController],
    providers: [ ItemsService],
})
export class ItemsModule {}
