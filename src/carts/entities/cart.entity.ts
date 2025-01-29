import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { AuditableEntity } from 'src/common/entites/auditable.entity';
import { CartStatus } from 'src/common/enums/cart-status.enum';
import { PaymentStatus } from 'src/common/enums/payment-status.enum';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('carts')
export class Cart extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { default: 0, name: 'total_amount', precision: 10, scale: 2 })
  totalAmount: number;

  @Column('enum', { enum: CartStatus, default: CartStatus.ACTIVE })
  status: CartStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    name: 'payment_status',
  })
  paymentStatus: PaymentStatus;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[];

  @OneToMany(() => Payment, (payment) => payment.cart, { cascade: true })
  payments: Payment[];
}
