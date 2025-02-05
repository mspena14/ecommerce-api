import { AuditableEntity } from "src/common/entites/auditable.entity";
import { CategoriesEnum } from "src/common/enums/categories.enum";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Schedule } from "src/schedules/entities/schedule.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('services')
export class Service extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('enum', { enum: CategoriesEnum })
  category: CategoriesEnum;

  @ManyToOne(() => User, (user) => user.services, { nullable: false })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => Schedule, (schedule) => schedule.service, { cascade: true })
  schedules: Schedule[];

  @OneToMany(() => Reservation, (reservation) => reservation.service, { cascade: true })
  reservations: Reservation[];
}

