import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.model';
import { Model } from 'mongoose';
import { CreateItemDTO } from 'src/dto/item.dto';

@Injectable()
export class ItemsService {

    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

    async getItems(): Promise<Item[]> {
        const items = await this.itemModel.find();
        return items;
    }

    async getSingleItem(itemId: string): Promise<Item> {
        const item = await this.itemModel.findById(itemId);
        return item;
    }

    async insertItem(createItemDto: CreateItemDTO): Promise<Item> {
        const newItem = new this.itemModel(createItemDto);
        return newItem.save();
    }

    async deleteItem(itemId: string): Promise<Item> {
        const deleteItem = await this.itemModel.findByIdAndDelete(itemId);
        return deleteItem;
    }

    async updateItem(itemId: string, createItemDTO: CreateItemDTO): Promise<Item> {
        const updatedItem = await this.itemModel
                            .findByIdAndUpdate(itemId, createItemDTO);
        return updatedItem;
    }

}
