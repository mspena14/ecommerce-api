import { CartItem } from "src/cart-items/entities/cart-item.entity";
import { AuditableEntity } from "src/common/entites/auditable.entity";
import { ReservationStatus } from "src/common/enums/reservation-status.enum";
import { Schedule } from "src/schedules/entities/schedule.entity";
import { Service } from "src/services/entities/service.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservations')
export class Reservation extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { enum: ReservationStatus })
  status: ReservationStatus;

  @Column('text')
  date: string;

  @Column('time', { name: 'end_time' })
  endTime: string;

  @Column('time', { name: 'start_time' })
  startTime: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.reservation, { cascade: true })
  cartItems: CartItem[];

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(() => Service, (service) => service.reservations, { nullable: false })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}

