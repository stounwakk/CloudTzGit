import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthController} from "./auth.controller";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {FileModule} from "../file/file.module";
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[UsersModule, FileModule,
      JwtModule.register({
          secret:'secret_key',
          signOptions:{
              expiresIn: '24h'
          },

      }),
      ClientsModule.register([
          {
              name: 'auth_service',
              transport: Transport.RMQ,
              options: {
                  urls: ['amqps://suuvemfg:3DlB-tHvRxPYP3gBgBOhERF7Fd6n_40C@cow.rmq2.cloudamqp.com/suuvemfg'],
                  queue: 'files_queue',
                  queueOptions: {
                      durable: false
                  },
              },
          },
      ]),

  ]
})
export class AuthModule {}
