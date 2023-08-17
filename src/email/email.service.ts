import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ExceptionFilter } from 'src/filters/rpc-exception.filter';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendOtp(sendOtpDto: any) {
    console.log(sendOtpDto);
    const { name, receiver, otp } = sendOtpDto;

    try {
      const result = await this.mailerService.sendMail({
        to: receiver,
        subject: 'Chainmart OTP',
        template: './otp',
        context: {
          name,
          otp,
        },
      });

      console.log(result);
    } catch (error) {
      console.log(error);
      throw new ExceptionFilter();
    }
  }

  async sendNewPassword(newPasswordDto: any) {
    console.log(newPasswordDto);
    const { name, receiver, password } = newPasswordDto;
    try {
      const result = await this.mailerService.sendMail({
        to: receiver,
        subject: 'Chainmart Password',
        template: './password',
        context: {
          name,
          password,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      throw new ExceptionFilter();
    }
  }
}
