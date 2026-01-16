import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  items: { item: string; qty: number; price: number }[];

  @Column('decimal')
  total: number;

  @Column({ default: 'PENDING' })
  status: string; // PENDING, PICKED_UP, COMPLETED, CANCELLED

  @Column()
  pickupLocation: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column(({ nullable: true }))
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
