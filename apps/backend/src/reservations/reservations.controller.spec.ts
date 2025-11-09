import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  const mockReservationsService = {
    reserveSeat: jest.fn(),
    cancelReservation: jest.fn(),
    getUserReservations: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        { provide: ReservationsService, useValue: mockReservationsService },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('reserve', () => {
    it('should call reservationsService.reserveSeat with correct params', async () => {
      const body = { user_id: 1, concert_id: 10 };
      mockReservationsService.reserveSeat.mockResolvedValue('reserved');

      const result = await controller.reserve(body);
      expect(result).toBe('reserved');
      expect(mockReservationsService.reserveSeat).toHaveBeenCalledWith(
        body.user_id,
        body.concert_id,
      );
    });
  });

  describe('cancel', () => {
    it('should call reservationsService.cancelReservation with correct params', async () => {
      const body = { user_id: 1, concert_id: 10 };
      mockReservationsService.cancelReservation.mockResolvedValue('cancelled');

      const result = await controller.cancel(body);
      expect(result).toBe('cancelled');
      expect(mockReservationsService.cancelReservation).toHaveBeenCalledWith(
        body.user_id,
        body.concert_id,
      );
    });
  });

  describe('getUserReservations', () => {
    it('should call reservationsService.getUserReservations with correct user_id', async () => {
      const userId = '1';
      const mockData = [{ id: 1, concert: { id: 10 } }];
      mockReservationsService.getUserReservations.mockResolvedValue(mockData);

      const result = await controller.getUserReservations(userId);
      expect(result).toBe(mockData);
      expect(mockReservationsService.getUserReservations).toHaveBeenCalledWith(
        1,
      );
    });
  });
});
