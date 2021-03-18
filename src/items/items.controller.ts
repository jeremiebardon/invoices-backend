import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

// DTO
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemService.delete(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: UpdateItemDto, @Param('id') id): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }
}
