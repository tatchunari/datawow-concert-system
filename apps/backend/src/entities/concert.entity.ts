import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation';
import { History } from './history.entity';
@Entity('concerts')
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  total_seats: number;

  @Column()
  available_seats: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.concert)
  reservations: Reservation[];

  @OneToMany(() => History, (history) => history.concert)
  history: History[];
}
