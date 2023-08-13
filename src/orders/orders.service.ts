import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

import { OrderDto } from './dto/order.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  socket: Server = null;

  constructor(private readonly usersService: UsersService) {}

  async sendApprovedOrder(orderDto: OrderDto) {
    try {
      const user = await this.usersService.findUserBySyncId(orderDto.user_id);
      this.socket.emit(user.username, 'Approved');
    } catch (error) {
      console.error(error);
    }
  }

  async sendCancelledOrder(orderDto: OrderDto) {
    try {
      const user = await this.usersService.findUserBySyncId(orderDto.user_id);
      this.socket.emit(user.username, 'Cancelled');
    } catch (error) {
      console.error(error);
    }
  }
}
