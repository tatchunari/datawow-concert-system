import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }

  create(username: string, email: string, role: string) {
    const user = this.usersRepo.create({ username, email, role });
    return this.usersRepo.save(user);
  }
}
