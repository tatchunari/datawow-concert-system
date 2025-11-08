import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Concert } from './concert.entity';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Concert)
  concert: Concert;

  @Column()
  action: string; // 'reserve' or 'cancel'

  @UpdateDateColumn()
  updated_at: Date;
}
