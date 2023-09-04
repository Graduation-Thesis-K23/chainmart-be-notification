import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

import { OrdersService } from './orders.service';
import { clientUrl } from 'src/constants';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

// Source
// https://stackoverflow.com/a/59760635/12923831

@WebSocketGateway({
  namespace: 'orders',
  cors: {
    origin: [clientUrl, 'https://chainmart.site', '*'],
    credentials: true,
  },
})
export class OrdersGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly configService: ConfigService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
  ) {}

  afterInit(server: Server) {
    this.ordersService.socket = server;
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client id (${client.id}) connected`);

    try {
      const cookies = cookie.parse(client.handshake.headers.cookie ?? '');
      if (Object.keys(cookies).length === 0) {
        throw new Error('Cookies is empty');
      }
      console.log('Cookies', cookies);

      const token = cookies['access_token'];
      if (!token) {
        throw new Error('Token not found');
      }

      const secret = this.configService.get('JWT_SECRET');
      const decoded = jwt.verify(token, secret) as any;
      console.log('decoded', decoded);

      const user = await this.usersService.findUserByUsername(decoded.username);
      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client id (${client.id}) disconnected`);
  }
}
