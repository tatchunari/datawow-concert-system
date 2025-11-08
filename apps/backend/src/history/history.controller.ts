import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  // GET /history
  @Get()
  getAll() {
    return this.historyService.findAll();
  }

  // GET /history?user_id=1
  @Get('by-user')
  getByUser(@Query('user_id', ParseIntPipe) user_id: number) {
    return this.historyService.findByUser(user_id);
  }

  // GET /history?concert_id=1
  @Get('by-concert')
  getByConcert(@Query('concert_id', ParseIntPipe) concert_id: number) {
    return this.historyService.findByConcert(concert_id);
  }
}
