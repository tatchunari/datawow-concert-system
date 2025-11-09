import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation';
import { History } from '../entities/history.entity';
import { User } from '../entities/user.entity';
import { Concert } from '../entities/concert.entity';
@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,
    @InjectRepository(Concert)
    private readonly concertRepo: Repository<Concert>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Get all reservations for a user
  async getUserReservations(user_id: number) {
    return this.reservationRepo.find({
      where: { user: { id: user_id } },
      relations: ['concert'],
    });
  }

  // Reserve a seat
  async reserveSeat(user_id: number, concert_id: number) {
    const user = await this.userRepo.findOneBy({ id: user_id });
    const concert = await this.concertRepo.findOneBy({ id: concert_id });

    if (!user || !concert)
      throw new NotFoundException('User or Concert not found');
    if (!concert.is_active)
      throw new BadRequestException('Concert is inactive');
    if (concert.available_seats <= 0)
      throw new BadRequestException('No seats available');

    const existing = await this.reservationRepo.findOne({
      where: {
        user: { id: user_id },
        concert: { id: concert_id },
        status: 'active',
      },
    });
    if (existing)
      throw new BadRequestException(
        'User already has a reservation for this concert',
      );

    // Create reservation
    const reservation = this.reservationRepo.create({
      user,
      concert,
      status: 'active',
    });
    await this.reservationRepo.save(reservation);

    // Decrease available seats
    concert.available_seats -= 1;
    await this.concertRepo.save(concert);

    // Log history
    const history = this.historyRepo.create({
      user,
      concert,
      action: 'reserve',
    });
    await this.historyRepo.save(history);

    return reservation;
  }

  // Cancel a reservation
  async cancelReservation(user_id: number, concert_id: number) {
    const reservation = await this.reservationRepo.findOne({
      where: {
        user: { id: user_id },
        concert: { id: concert_id },
        status: 'active',
      },
      relations: ['concert', 'user'],
    });
    if (!reservation)
      throw new NotFoundException('Active reservation not found');

    reservation.status = 'cancelled';
    await this.reservationRepo.save(reservation);

    reservation.concert.available_seats += 1;
    await this.concertRepo.save(reservation.concert);

    const history = this.historyRepo.create({
      user: reservation.user,
      concert: reservation.concert,
      action: 'cancel',
    });
    await this.historyRepo.save(history);

    return reservation;
  }

  async getReservationById(reservationId: number) {
    const reservation = await this.reservationRepo.findOne({
      where: { id: reservationId },
      relations: ['user', 'concert'],
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    return reservation;
  }
}
