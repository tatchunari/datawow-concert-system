import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concert } from 'src/entities/concert.entity';
import { CreateConcertDto } from './dto/create-concert.dto';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepo: Repository<Concert>,
  ) {}

  // Create a new concert
  async createConcert(dto: CreateConcertDto) {
    const concert = this.concertRepo.create({
      ...dto,
      available_seats: dto.total_seats,
      is_active: true,
    });
    return this.concertRepo.save(concert);
  }

  // Get all concerts (active or not)
  findAll() {
    return this.concertRepo.find();
  }

  // Deactivate a concert (mark inactive)
  async deactivateConcert(id: number) {
    const concert = await this.concertRepo.findOneBy({ id });
    if (!concert) return null;
    concert.is_active = false;
    return this.concertRepo.save(concert);
  }
}
