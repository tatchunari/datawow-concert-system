import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class CancelSeatDto {
  @Type(() => Number)
  @IsInt({ message: 'user_id must be an integer' })
  @Min(1, { message: 'user_id must be at least 1' })
  user_id: number;

  @Type(() => Number)
  @IsInt({ message: 'concert_id must be an integer' })
  @Min(1, { message: 'concert_id must be at least 1' })
  concert_id: number;
}
