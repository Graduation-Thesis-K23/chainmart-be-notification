import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { configValidationSchema } from './config/validate-env';
import { PostgresModule } from './database/postgres.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    PostgresModule,
    OrdersModule,
    UsersModule,
    EmailModule,
    PhoneModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
