import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  // Get all concerts
  @Get()
  getAll() {
    return this.concertsService.findAll();
  }

  // Create a new concert
  @Post()
  create(@Body() body: CreateConcertDto) {
    return this.concertsService.createConcert(body);
  }

  // Deactivate a concert
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.concertsService.deactivateConcert(Number(id));
  }
}
