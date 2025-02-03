import { CartItem } from "src/cart-items/entities/cart-item.entity";
import { AuditableEntity } from "src/common/entites/auditable.entity";
import { ImageInterface } from "src/common/interfaces/images.interface";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('decimal', { nullable: false })
  price: number;

  @Column('int', { nullable: false })
  stock: number;

  @Column('jsonb', { nullable: true })
  images: ImageInterface;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, { cascade: true })
  cartItems: CartItem[];
}
