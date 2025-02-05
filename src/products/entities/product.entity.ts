import { CartItem } from "src/cart-items/entities/cart-item.entity";
import { AuditableEntity } from "src/common/entites/auditable.entity";
import { CategoriesEnum } from "src/common/enums/categories.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @Column('text', { array: true, nullable: true, default: [] })
  images: string[];

  @Column('enum', { enum: CategoriesEnum })
  category: CategoriesEnum;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, { cascade: true })
  cartItems: CartItem[];
}
