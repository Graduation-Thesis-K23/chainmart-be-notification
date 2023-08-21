import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @MessagePattern('notification.health-check')
  healthCheck() {
    console.log('notification.health-check received');

    return 'notification service is working';
  }
}
