import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.model';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {

    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

    async insertItem(title: string, description: string, done: boolean) {
        const newItem = new this.itemModel({
            title,
            description,
            done,
        });
        const result = await newItem.save();
        return result.id as string;
    }

    async getItems() {
        const items = await this.itemModel.find().exec();
        return items.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            done: item.done,
        }));
    }

    async getSingleItem(itemId: string) {
        const item = await this.findItem(itemId);
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            done: item.done,
        };
    }

    async updateItem(itemId: string, title: string, description: string, done: boolean ) {
        const updatedItem = await this.findItem(itemId);
        if ( title ) {
            updatedItem.title = title;
        }
        if ( description ) {
            updatedItem.description = description;
        }
        if ( done ) {
            updatedItem.done = done;
        }
        return updatedItem.save();
    }

    async deleteItem(itemId) {
        const result = await this.itemModel.deleteOne({_id: itemId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find a product');
        }
    }

    private async findItem(id: string): Promise<Item> {
        let item;
        try {
            item = await this.itemModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find a product');
        }
        if (!item) {
            throw new NotFoundException('Could not find a product');
        }
        return item;
    }
}
