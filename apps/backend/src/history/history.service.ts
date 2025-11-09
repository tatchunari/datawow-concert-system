import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from '../entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepo: Repository<History>,
  ) {}

  // Get all history
  async findAll() {
    return this.historyRepo.find({
      relations: ['user', 'concert'],
      order: { updated_at: 'DESC' },
    });
  }

  // Get history filtered by user_id
  async findByUser(user_id: number) {
    return this.historyRepo.find({
      where: { user: { id: user_id } },
      relations: ['user', 'concert'],
      order: { updated_at: 'DESC' },
    });
  }

  // Get history filtered by concert_id
  async findByConcert(concert_id: number) {
    return this.historyRepo.find({
      where: { concert: { id: concert_id } },
      relations: ['user', 'concert'],
      order: { updated_at: 'DESC' },
    });
  }
}
