import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import {
  DeleteConcertDto,
  DeactivateConcertDto,
} from './dto/delete-concert.dto';

describe('ConcertsController', () => {
  let controller: ConcertsController;
  let service: Partial<Record<keyof ConcertsService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({}),
      createConcert: jest.fn().mockResolvedValue({}),
      deleteConcert: jest.fn().mockResolvedValue({}),
      deactivateConcert: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [
        {
          provide: ConcertsService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ConcertsController>(ConcertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all concerts', async () => {
      const result = await controller.getAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return a single concert by id', async () => {
      const concertId = '1';
      const result = await controller.getById(concertId);
      expect(service.findOne).toHaveBeenCalledWith(Number(concertId));
      expect(result).toEqual({});
    });
  });

  describe('create', () => {
    it('should create a new concert', async () => {
      const dto: CreateConcertDto = {
        name: 'Test Concert',
        description: 'Test description',
        total_seats: 100,
      };
      const result = await controller.create(dto);
      expect(service.createConcert).toHaveBeenCalledWith(dto);
      expect(result).toEqual({});
    });
  });

  describe('delete', () => {
    it('should delete a concert', async () => {
      const params: DeleteConcertDto = { id: 1 };
      const result = await controller.delete(params);
      expect(service.deleteConcert).toHaveBeenCalledWith(params.id);
      expect(result).toEqual({});
    });
  });

  describe('deactivate', () => {
    it('should deactivate a concert', async () => {
      const params: DeactivateConcertDto = { id: 1 };
      const result = await controller.deactivate(params);
      expect(service.deactivateConcert).toHaveBeenCalledWith(params.id);
      expect(result).toEqual({});
    });
  });
});
