import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateConcertDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(1, { message: 'Total seats must be at least 1' })
  @Max(1000, { message: 'Total seats must not exceed 1000' })
  total_seats: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  available_seats?: number;
}
