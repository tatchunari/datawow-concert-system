import { Test, TestingModule } from '@nestjs/testing';
import { ConcertsService } from './concerts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Concert } from '../entities/concert.entity';
import { Reservation } from '../entities/reservation';
import { Repository } from 'typeorm';

describe('ConcertsService', () => {
  let service: ConcertsService;
  let concertRepo: Partial<Record<keyof Repository<Concert>, jest.Mock>>;
  let reservationRepo: Partial<
    Record<keyof Repository<Reservation>, jest.Mock>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertsService,
        {
          provide: getRepositoryToken(Concert),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            find: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ConcertsService>(ConcertsService);
    concertRepo = module.get(getRepositoryToken(Concert));
    reservationRepo = module.get(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createConcert', () => {
    it('should create and return a concert', async () => {
      const dto: { name: string; description: string; total_seats: number } = {
        name: 'Test Concert',
        description: 'desc',
        total_seats: 100,
      };

      const savedConcert: Concert = {
        id: 1,
        name: dto.name,
        description: dto.description,
        total_seats: dto.total_seats,
        available_seats: dto.total_seats,
        is_active: true,
      } as Concert;

      concertRepo.create!.mockReturnValue(savedConcert);
      concertRepo.save!.mockResolvedValue(savedConcert);

      const result = await service.createConcert(dto);

      expect(concertRepo.create).toHaveBeenCalledWith({
        ...dto,
        available_seats: dto.total_seats,
        is_active: true,
      });
      expect(concertRepo.save).toHaveBeenCalledWith(savedConcert);
      expect(result.reserved_seats).toBe(0);
      expect(result.cancelled_seats).toBe(0);
    });
  });

  describe('findAll', () => {
    it('should return all concerts with stats', async () => {
      const concerts: Concert[] = [
        {
          id: 1,
          name: 'Concert 1',
          description:
            'Special exclusive seasonal concert festival held seaside with great view and vibes.',
          total_seats: 100,
          available_seats: 100,
          is_active: true,
          created_at: new Date(),
          reservations: [],
          history: [],
        } as Concert,
      ];

      concertRepo.find!.mockResolvedValue(concerts);
      reservationRepo.count!.mockResolvedValue(0);

      const result = await service.findAll();

      expect(concertRepo.find).toHaveBeenCalled();
      expect(result.length).toBe(1);
      expect(result[0].reserved_seats).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should return a concert with calculated seats', async () => {
      const concert: Concert = { id: 1, total_seats: 100 } as Concert;
      concertRepo.findOne!.mockResolvedValue(concert);
      reservationRepo.find!.mockResolvedValue([
        { status: 'active' } as Reservation,
      ]);

      const result = await service.findOne(1);

      expect(concertRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result.reserved_seats).toBe(1);
    });

    it('should throw an error if concert not found', async () => {
      concertRepo.findOne!.mockResolvedValue(undefined);
      await expect(service.findOne(1)).rejects.toThrow('Concert not found');
    });
  });

  describe('calculateSeatStats', () => {
    it('should return reserved and cancelled seats', async () => {
      reservationRepo
        .count!.mockResolvedValueOnce(5) // reserved
        .mockResolvedValueOnce(2); // cancelled

      const result = await service.calculateSeatStats(1);
      expect(reservationRepo.count).toHaveBeenCalledTimes(2);
      expect(result.reserved_seats).toBe(5);
      expect(result.cancelled_seats).toBe(2);
    });
  });

  describe('deleteConcert', () => {
    it('should delete a concert', async () => {
      const concert: Concert = { id: 1 } as Concert;
      concertRepo.findOneBy!.mockResolvedValue(concert);
      concertRepo.remove!.mockResolvedValue(concert);

      const result = await service.deleteConcert(1);
      expect(result).toEqual(concert);
    });

    it('should throw error if concert not found', async () => {
      concertRepo.findOneBy!.mockResolvedValue(undefined);
      await expect(service.deleteConcert(1)).rejects.toThrow(
        'Concert not found',
      );
    });
  });
});
