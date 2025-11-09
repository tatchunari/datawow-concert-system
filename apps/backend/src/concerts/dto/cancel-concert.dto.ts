import { IsInt, Min } from 'class-validator';

export class CancelConcertDto {
  @IsInt()
  @Min(1)
  id: number;
}
