import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PhoneService } from './phone.service';

@Controller()
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @MessagePattern('phone.sendOtp')
  sendOtp(@Payload() sendOtpDto: any) {
    return this.phoneService.sendOtp(sendOtpDto);
  }

  @MessagePattern('phone.sendPassword')
  sendPassword(@Payload() sendPasswordDto: any) {
    return this.phoneService.sendPassword(sendPasswordDto);
  }
}
