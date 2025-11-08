import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { ConcertsModule } from './concerts/concerts.module';
// import { ReservationsModule } from './reservations/reservations.module';
// import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true, // automatically load entities from modules
      synchronize: true, // auto-create tables (only for development!)
    }),
    UsersModule,
    // ConcertsModule,
    // ReservationsModule,
    // HistoryModule,
  ],
})
export class AppModule {}
