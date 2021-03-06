import { ItemsService } from './items.service';
import { Controller, Post, Body, Get, Param, Delete, Res, HttpStatus, NotFoundException, Query, Put } from '@nestjs/common';
import { CreateItemDTO } from 'src/dto/item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}

    @Post('/add')
    async addItem(@Res() res, @Body() createItemDTO: CreateItemDTO) {
        debugger;
        const itemAdd = await this.itemService.insertItem(createItemDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Ited Successfully Added',
            itemAdd,
        });
    }

    @Get()
    async getAllItems() {
        debugger;
        const items = await this.itemService.getItems();
        return items;
    }

    @Get(':itemId')
    async getItem(@Res() res, @Param('itemId') itemId) {
        const item = await this.itemService.getSingleItem(itemId);
        if (!item) { throw new NotFoundException('Item does not exist!'); }
        return res.status(HttpStatus.OK).json(item);
    }

    @Put('/update')
    async updateItem(@Res() res, @Body() createItemDTO: CreateItemDTO, @Query('itemId') itemId) {
        const updatedItem = await this.itemService.updateItem(itemId, createItemDTO);
        if (!updatedItem) { throw new NotFoundException('Item does not exist!'); }

        return res.status(HttpStatus.OK).json({
            message: 'Item Updated Successfully',
            updatedItem,
        });
    }

    @Delete(':id')
    async deleteItem(@Res() res, @Param('id') itemId: string) {
        const itemDeleted = await this.itemService.deleteItem(itemId);
        if (!itemDeleted) { throw new NotFoundException('Item does not exist!'); }

        return res.status(HttpStatus.OK).json({
            message: 'Item Deleted Successfully',
            itemDeleted,
        });
    }
}
