import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { Concert } from 'src/entities/concert.entity';
import { Reservation } from 'src/entities/reservation';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Reservation])],
  providers: [ConcertsService],
  controllers: [ConcertsController],
})
export class ConcertsModule {}
