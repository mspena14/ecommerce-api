import { Cart } from "src/carts/entities/cart.entity";
import { AuditableEntity } from "src/common/entites/auditable.entity";
import { PaymentStatus } from "src/common/enums/payment-status.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class Payment extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column('enum', { enum: PaymentStatus })
  status: PaymentStatus;

  @Column('text', { name: 'transaction_id' })
  transactionId: string;

  @ManyToOne(() => Cart, (cart) => cart.payments)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;
}
