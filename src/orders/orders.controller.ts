import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('notification.orderapproved')
  approveOrder(order: any) {
    console.log('Order to approve', order);
    this.ordersService.sendApprovedOrder(order);
  }

  @EventPattern('notification.ordercancelled')
  cancelOrder(order: any) {
    console.log('Order to cancel', order);
    this.ordersService.sendCancelledOrder(order);
  }
}
