import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from 'src/entities/concert.entity';
import { Reservation } from 'src/entities/reservation';
import { CreateConcertDto } from './dto/create-concert.dto';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepo: Repository<Concert>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  // Create a new concert
  async createConcert(dto: CreateConcertDto) {
    const concert = this.concertRepo.create({
      ...dto,
      available_seats: dto.total_seats,
      is_active: true,
    });
    const saved = await this.concertRepo.save(concert);

    return {
      ...saved,
      total_seats: saved.total_seats,
      available_seats: saved.available_seats,
      reserved_seats: 0,
      cancelled_seats: 0,
    };
  }

  // Get all concerts with seat calculations
  async findAll() {
    const concerts = await this.concertRepo.find({
      relations: ['reservations'],
    });

    // Add computed fields for each concert
    return Promise.all(
      concerts.map(async (concert) => {
        const stats = await this.calculateSeatStats(concert.id);
        return {
          ...concert,
          total_seats: concert.total_seats,
          ...stats,
        };
      }),
    );
  }

  // Get one concert by ID with seat calculations
  async findOne(id: number) {
    const concert = await this.concertRepo.findOne({ where: { id } });
    if (!concert) throw new Error('Concert not found');

    const reservations = await this.reservationRepo.find({
      where: { concert: { id } },
    });

    const reservedSeats = reservations.filter(
      (r) => r.status === 'active',
    ).length;
    const cancelledSeats = reservations.filter(
      (r) => r.status === 'cancel',
    ).length;

    const availableSeats = concert.total_seats - reservedSeats + cancelledSeats;

    return {
      ...concert,
      reserved_seats: reservedSeats,
      cancelled_seats: cancelledSeats,
      available_seats: availableSeats,
    };
  }

  // Calculate reserved and cancelled seats for a concert
  async calculateSeatStats(concertId: number) {
    // Count reserved seats (status = 'reserved')
    const reservedSeats = await this.reservationRepo.count({
      where: {
        concert: { id: concertId },
        status: 'active',
      },
    });

    // Count cancelled seats (status = 'cancelled')
    const cancelledSeats = await this.reservationRepo.count({
      where: {
        concert: { id: concertId },
        status: 'cancelled',
      },
    });

    return {
      reserved_seats: reservedSeats,
      cancelled_seats: cancelledSeats,
    };
  }

  // Get detailed seat statistics for a concert
  async getSeatStatistics(concertId: number) {
    const concert = await this.concertRepo.findOne({
      where: { id: concertId },
    });

    if (!concert) throw new NotFoundException('Concert not found');

    const stats = await this.calculateSeatStats(concertId);

    return {
      concert_id: concertId,
      concert_name: concert.name,
      total_seats: concert.total_seats,
      available_seats: concert.available_seats,
      reserved_seats: stats.reserved_seats,
      cancelled_seats: stats.cancelled_seats,
      // Additional useful calculations
      occupied_percentage: (
        (stats.reserved_seats / concert.total_seats) *
        100
      ).toFixed(2),
      is_sold_out: concert.available_seats === 0,
    };
  }

  // Deactivate a concert
  async deactivateConcert(id: number) {
    const concert = await this.concertRepo.findOneBy({ id });
    if (!concert) return null;

    concert.is_active = false;
    return this.concertRepo.save(concert);
  }
  // Delete a concert
  async deleteConcert(id: number) {
    const concert = await this.concertRepo.findOneBy({ id });
    if (!concert) throw new Error('Concert not found');
    return this.concertRepo.remove(concert);
  }
}
