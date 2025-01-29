import { Cart } from 'src/carts/entities/cart.entity';
import { AuditableEntity } from 'src/common/entites/auditable.entity';
import { CartItemType } from 'src/common/enums/cart-item-type.enum';
import { Product } from 'src/products/entities/product.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart_items')
export class CartItem extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('enum', { enum: CartItemType, nullable: false })
  type: CartItemType;

  @Column('int', { nullable: false })
  quantity: number;

  @Column('decimal', {
    nullable: false,
    name: 'unit_price',
    precision: 10,
    scale: 2,
  })
  unitPrice: number;

  @Column('decimal', {
    nullable: false,
    name: 'total_amount',
    precision: 10,
    scale: 2,
  })
  totalAmount: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { nullable: false })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Reservation, { nullable: true })
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;
}
