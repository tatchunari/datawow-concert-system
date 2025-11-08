import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { Concert } from './entities/concert.entity';
import { Reservation } from './entities/reservation';
import { History } from './entities/history.entity';
import { ConcertsModule } from './concerts/concerts.module';
import { ReservationsModule } from './reservations/reservations.module';
// import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      entities: [User, Concert, Reservation, History],
      synchronize: true,
    }),
    UsersModule,
    ConcertsModule,
    ReservationsModule,
    // HistoryModule,
  ],
})
export class AppModule {}
