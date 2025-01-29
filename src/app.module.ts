import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [UsersModule, ProductsModule, ServicesModule, SchedulesModule, ReservationsModule, CartsModule, CartItemsModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
