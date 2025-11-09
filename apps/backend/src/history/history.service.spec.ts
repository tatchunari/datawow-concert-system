import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { History } from '../entities/history.entity';
import { Repository } from 'typeorm';

describe('HistoryService', () => {
  let service: HistoryService;
  let repo: Repository<History>;

  const mockHistoryRepo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        { provide: getRepositoryToken(History), useValue: mockHistoryRepo },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    repo = module.get<Repository<History>>(getRepositoryToken(History));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all history records', async () => {
      const result = [{ id: 1, user: { id: 1 }, concert: { id: 10 } }];
      mockHistoryRepo.find.mockResolvedValue(result);

      const res = await service.findAll();
      expect(res).toEqual(result);
      expect(mockHistoryRepo.find).toHaveBeenCalledWith({
        relations: ['user', 'concert'],
        order: { updated_at: 'DESC' },
      });
    });
  });

  describe('findByUser', () => {
    it('should return history records filtered by user_id', async () => {
      const userId = 1;
      const result = [{ id: 1, user: { id: userId }, concert: { id: 10 } }];
      mockHistoryRepo.find.mockResolvedValue(result);

      const res = await service.findByUser(userId);
      expect(res).toEqual(result);
      expect(mockHistoryRepo.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['user', 'concert'],
        order: { updated_at: 'DESC' },
      });
    });
  });

  describe('findByConcert', () => {
    it('should return history records filtered by concert_id', async () => {
      const concertId = 10;
      const result = [{ id: 1, user: { id: 1 }, concert: { id: concertId } }];
      mockHistoryRepo.find.mockResolvedValue(result);

      const res = await service.findByConcert(concertId);
      expect(res).toEqual(result);
      expect(mockHistoryRepo.find).toHaveBeenCalledWith({
        where: { concert: { id: concertId } },
        relations: ['user', 'concert'],
        order: { updated_at: 'DESC' },
      });
    });
  });
});
