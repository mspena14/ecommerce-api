import { Cart } from "src/carts/entities/cart.entity";
import { AuditableEntity } from "src/common/entites/auditable.entity";
import { UserRole } from "src/common/enums/user-role.enum";
import { Payment } from "src/payments/entities/payment.entity";
import { Product } from "src/products/entities/product.entity";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Service } from "src/services/entities/service.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { unique: true, nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('enum', { enum: UserRole, nullable: false })
  role: UserRole;

  @Column('text', { nullable: true })
  phone: string;

  @Column('text', { nullable: true })
  address: string;
  
  @OneToMany(() => Cart, (cart) => cart.buyer, { cascade: true })
  carts: Cart;
  
  @OneToMany(() => Product, (product) => product.seller, { cascade: true })
  products: Product[];

  @OneToMany(() => Service, (service) => service.seller, { cascade: true })
  services: Service[];

  @OneToMany(() => Reservation, (reservation) => reservation.buyer, { cascade: true })
  reservations: Reservation[];

  @OneToMany(() => Payment, (payment) => payment.buyer, { cascade: true })
  payments: Payment[];
}

