import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation';
import { History } from '../entities/history.entity';
import { User } from '../entities/user.entity';
import { Concert } from '../entities/concert.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;

  const mockReservationRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockHistoryRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockConcertRepo = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  const mockUserRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockReservationRepo,
        },
        { provide: getRepositoryToken(History), useValue: mockHistoryRepo },
        { provide: getRepositoryToken(Concert), useValue: mockConcertRepo },
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserReservations', () => {
    it('should return reservations for a user', async () => {
      const mockData = [{ id: 1, concert: { id: 10 } }];
      mockReservationRepo.find.mockResolvedValue(mockData);

      const result = await service.getUserReservations(1);
      expect(result).toBe(mockData);
      expect(mockReservationRepo.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
        relations: ['concert'],
      });
    });
  });

  describe('reserveSeat', () => {
    it('should throw NotFoundException if user or concert not found', async () => {
      mockUserRepo.findOneBy.mockResolvedValue(null);
      mockConcertRepo.findOneBy.mockResolvedValue(null);

      await expect(service.reserveSeat(1, 10)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if concert inactive', async () => {
      mockUserRepo.findOneBy.mockResolvedValue({ id: 1 });
      mockConcertRepo.findOneBy.mockResolvedValue({ id: 10, is_active: false });

      await expect(service.reserveSeat(1, 10)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if no seats available', async () => {
      mockUserRepo.findOneBy.mockResolvedValue({ id: 1 });
      mockConcertRepo.findOneBy.mockResolvedValue({
        id: 10,
        is_active: true,
        available_seats: 0,
      });

      await expect(service.reserveSeat(1, 10)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if reservation already exists', async () => {
      mockUserRepo.findOneBy.mockResolvedValue({ id: 1 });
      mockConcertRepo.findOneBy.mockResolvedValue({
        id: 10,
        is_active: true,
        available_seats: 5,
      });
      mockReservationRepo.findOne.mockResolvedValue({ id: 100 });

      await expect(service.reserveSeat(1, 10)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create reservation successfully', async () => {
      const user = { id: 1 };
      const concert = { id: 10, is_active: true, available_seats: 5 };
      const reservation = { id: 1, user, concert, status: 'active' };
      const history = { id: 1, user, concert, action: 'reserve' };

      mockUserRepo.findOneBy.mockResolvedValue(user);
      mockConcertRepo.findOneBy.mockResolvedValue(concert);
      mockReservationRepo.findOne.mockResolvedValue(null);
      mockReservationRepo.create.mockReturnValue(reservation);
      mockReservationRepo.save.mockResolvedValue(reservation);
      mockConcertRepo.save.mockResolvedValue(concert);
      mockHistoryRepo.create.mockReturnValue(history);
      mockHistoryRepo.save.mockResolvedValue(history);

      const result = await service.reserveSeat(1, 10);
      expect(result).toBe(reservation);
      expect(mockReservationRepo.save).toHaveBeenCalledWith(reservation);
      expect(mockConcertRepo.save).toHaveBeenCalledWith({
        ...concert,
        available_seats: 4,
      });
      expect(mockHistoryRepo.save).toHaveBeenCalledWith(history);
    });
  });

  describe('cancelReservation', () => {
    it('should throw NotFoundException if active reservation not found', async () => {
      mockReservationRepo.findOne.mockResolvedValue(null);

      await expect(service.cancelReservation(1, 10)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should cancel reservation successfully', async () => {
      const reservation = {
        id: 1,
        status: 'active',
        concert: { id: 10, available_seats: 4, save: jest.fn() },
        user: { id: 1 },
      };
      mockReservationRepo.findOne.mockResolvedValue(reservation);
      mockReservationRepo.save.mockResolvedValue({
        ...reservation,
        status: 'cancelled',
      });
      mockConcertRepo.save.mockResolvedValue({ ...reservation.concert });
      mockHistoryRepo.create.mockReturnValue({ id: 1 });
      mockHistoryRepo.save.mockResolvedValue({ id: 1 });

      const result = await service.cancelReservation(1, 10);
      expect(result.status).toBe('cancelled');
      expect(mockReservationRepo.save).toHaveBeenCalledWith(reservation);
      expect(mockConcertRepo.save).toHaveBeenCalledWith(reservation.concert);
      expect(mockHistoryRepo.save).toHaveBeenCalled();
    });
  });

  describe('getReservationById', () => {
    it('should throw NotFoundException if reservation not found', async () => {
      mockReservationRepo.findOne.mockResolvedValue(null);
      await expect(service.getReservationById(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return reservation by id', async () => {
      const reservation = { id: 1, user: { id: 1 }, concert: { id: 10 } };
      mockReservationRepo.findOne.mockResolvedValue(reservation);

      const result = await service.getReservationById(1);
      expect(result).toBe(reservation);
      expect(mockReservationRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['user', 'concert'],
      });
    });
  });
});
