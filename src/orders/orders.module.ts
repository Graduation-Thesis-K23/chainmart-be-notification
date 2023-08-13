import { Module } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [OrdersGateway, OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
