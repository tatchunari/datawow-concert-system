import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from 'src/entities/reservation';
import { History } from 'src/entities/history.entity';
import { User } from 'src/entities/user.entity';
import { Concert } from 'src/entities/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, History, Concert, User])],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
