import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { History } from 'src/entities/history.entity';
import { User } from 'src/entities/user.entity';
import { Concert } from 'src/entities/concert.entity';
@Module({
  imports: [TypeOrmModule.forFeature([History, User, Concert])],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
