import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ phone: createUserDto.phone });
    if (existingUser) {
      // If user exists, update location if changed, or just return
      existingUser.location = createUserDto.location;
      return this.usersRepository.save(existingUser);
    }
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByPhone(phone: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ phone });
  }
}
