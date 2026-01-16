import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // 1. Find or Create User
    let user = await this.usersService.findOneByPhone(createOrderDto.phone);
    if (!user) {
      user = await this.usersService.create({
        name: 'Guest User', // Placeholder if not provided
        phone: createOrderDto.phone,
        location: createOrderDto.location,
      });
    }

    // 2. Create Order
    const order = this.ordersRepository.create({
      items: createOrderDto.items,
      total: createOrderDto.total,
      pickupLocation: createOrderDto.location,
      user: user,
      status: 'PENDING',
    });

    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user'] });
  }

  findByUser(phone: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { phone } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
