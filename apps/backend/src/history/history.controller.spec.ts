import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

describe('HistoryController', () => {
  let controller: HistoryController;
  let service: HistoryService;

  const mockHistoryService = {
    findAll: jest.fn(),
    findByUser: jest.fn(),
    findByConcert: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [{ provide: HistoryService, useValue: mockHistoryService }],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call historyService.findAll and return result', async () => {
      const result = [{ id: 1, concertName: 'Rock Night', userId: 1 }];
      mockHistoryService.findAll.mockResolvedValue(result);

      const res = await controller.getAll();
      expect(res).toEqual(result);
      expect(mockHistoryService.findAll).toHaveBeenCalled();
    });
  });

  describe('getByUser', () => {
    it('should call historyService.findByUser with user_id', async () => {
      const userId = 1;
      const result = [{ id: 1, concertName: 'Rock Night', userId }];
      mockHistoryService.findByUser.mockResolvedValue(result);

      const res = await controller.getByUser(userId);
      expect(res).toEqual(result);
      expect(mockHistoryService.findByUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('getByConcert', () => {
    it('should call historyService.findByConcert with concert_id', async () => {
      const concertId = 10;
      const result = [{ id: 1, concertName: 'Rock Night', userId: 1 }];
      mockHistoryService.findByConcert.mockResolvedValue(result);

      const res = await controller.getByConcert(concertId);
      expect(res).toEqual(result);
      expect(mockHistoryService.findByConcert).toHaveBeenCalledWith(concertId);
    });
  });
});
