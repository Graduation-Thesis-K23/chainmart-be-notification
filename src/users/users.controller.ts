import { Controller, UseFilters } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { ExceptionFilter } from 'src/filters/rpc-exception.filter';

@Controller()
@UseFilters(new ExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('notification.users.created')
  create(createOrderDto: any) {
    console.log(createOrderDto);
    return this.usersService.create(createOrderDto);
  }
}
