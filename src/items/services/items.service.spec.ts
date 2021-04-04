import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from '../items.controller';
import { mockItemsModel } from '../mocks/items.mocks';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let itemsController: ItemsController;
  let itemsService: ItemsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        ItemsService,
        {
          provide: getModelToken('Item'),
          useValue: mockItemsModel,
        },
      ],
    }).compile();

    itemsService = moduleRef.get<ItemsService>(ItemsService);
    itemsController = moduleRef.get<ItemsController>(ItemsController);
  });

  describe('Service and controllers are defined', () => {
    it('Services are defined', () => {
      expect(itemsService).toBeDefined();
    });

    it('Controllers are defined', () => {
      expect(itemsController).toBeDefined();
    });
  });
});
