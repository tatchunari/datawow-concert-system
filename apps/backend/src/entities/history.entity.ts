import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Concert } from './concert.entity';
@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.history)
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.history)
  concert: Concert;

  @Column()
  action: string; // 'reserve' or 'cancel'

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  seats: number;
}
