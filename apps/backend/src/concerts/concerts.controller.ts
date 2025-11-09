import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

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
  // Get a single concert by id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.concertsService.findOne(Number(id));
  }

  // Create a new concert
  @Post()
  create(@Body() body: CreateConcertDto) {
    return this.concertsService.createConcert(body);
  }

  // Delete a concert
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.concertsService.deleteConcert(Number(id));
  }
}
