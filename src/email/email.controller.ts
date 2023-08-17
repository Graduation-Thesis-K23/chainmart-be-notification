import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('email.sendOtp')
  sendOtp(@Payload() sendOtpDto: any) {
    return this.emailService.sendOtp(sendOtpDto);
  }

  @MessagePattern('email.sendNewPassword')
  sendNewPassword(@Payload() sendNewPassword: any) {
    return this.emailService.sendNewPassword(sendNewPassword);
  }
}
