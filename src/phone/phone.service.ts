import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhoneService {
  constructor(private readonly configService: ConfigService) {}

  async sendOtp(sendOtpDto: any) {
    const { receiver, otp } = sendOtpDto;

    const urlPhoneServer = `http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=${receiver}&Content=${otp} la ma xac minh dang ky Baotrixemay cua ban&ApiKey=${this.configService.get<string>(
      'SMS_API_KEY',
    )}&SecretKey=${this.configService.get<string>(
      'SMS_SECRET_KEY',
    )}&Brandname=Baotrixemay&SmsType=2`;

    const result = (await fetch(urlPhoneServer)).json();

    console.log(result);
  }

  async sendPassword(sendPasswordDto: any) {
    const { receiver, password } = sendPasswordDto;

    const urlPhoneServer = `http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=${receiver}&Content=${password} la ma xac minh dang ky Baotrixemay cua ban&ApiKey=${this.configService.get<string>(
      'SMS_API_KEY',
    )}&SecretKey=${this.configService.get<string>(
      'SMS_SECRET_KEY',
    )}&Brandname=Baotrixemay&SmsType=2`;

    const result = (await fetch(urlPhoneServer)).json();

    console.log(result);
  }
}
