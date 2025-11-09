import { IsInt, Min } from 'class-validator';

export class DeleteConcertDto {
  @IsInt()
  @Min(1)
  id: number;
}
// deactivate-concert.dto.ts
export class DeactivateConcertDto {
  @IsInt()
  @Min(1)
  id: number;
}
