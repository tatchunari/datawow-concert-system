import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReserveSeatDto } from './dto/reserve-seat.dto';
import { CancelSeatDto } from './dto/cancel-seat.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('reserve')
  reserve(@Body() body: ReserveSeatDto) {
    return this.reservationsService.reserveSeat(body.user_id, body.concert_id);
  }

  @Post('cancel')
  cancel(@Body() body: CancelSeatDto) {
    return this.reservationsService.cancelReservation(
      body.user_id,
      body.concert_id,
    );
  }
  // 🧾 Get all reservations for a specific user
  @Get('user/:user_id')
  getUserReservations(@Param('user_id') user_id: string) {
    return this.reservationsService.getUserReservations(Number(user_id));
  }
}
