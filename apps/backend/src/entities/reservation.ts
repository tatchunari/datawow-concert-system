import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Concert } from './concert.entity';

@Entity('reservations')
@Unique(['user', 'concert'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Concert)
  concert: Concert;

  @Column()
  status: string; // 'reserved' or 'cancelled'

  @UpdateDateColumn()
  updated_at: Date;
}
