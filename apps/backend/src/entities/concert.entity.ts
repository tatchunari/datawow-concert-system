import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;
}
