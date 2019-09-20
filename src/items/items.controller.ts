import { ItemsService } from './items.service';

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {

    }

    @Post()
    async addItem(
        @Body('title') itemTitle: string,
        @Body('description') itemDescription: string,
        @Body('done') done: boolean,
        ) {
        const generateId = await this.itemService.insertItem(
            itemTitle,
            itemDescription,
            done,
        );
        return {id : generateId};
    }

    @Get()
    async getAllItems() {
        const items = this.itemService.getItems();
        return items;
    }

    @Get(':id')
    getItem(@Param('id') itemId) {
        return this.itemService.getSingleItem(itemId);
    }

    @Patch(':id')
    async updateItem(
        @Param('id') itemId: string,
        @Body('title') itemTitle: string,
        @Body('description') itemDescription: string,
        @Body('done') done: boolean,
    ) {
        await this.itemService.updateItem(itemId, itemTitle, itemDescription, done);
        return null;
    }

    @Delete(':id')
    async deleteItem(@Param('id') itemId) {
        await this.itemService.deleteItem(itemId);
        return null;
    }

}
