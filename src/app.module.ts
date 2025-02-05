import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module'
import { DatabaseConfigService } from './common/config/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    ServicesModule,
    SchedulesModule,
    ReservationsModule,
    CartsModule,
    CartItemsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
