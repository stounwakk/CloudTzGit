import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UsersController} from "./users.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {FileModule} from "../file/file.module";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  controllers:[UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([UserModel]),
      FileModule
  ],
  exports:[UsersService]
})
export class UsersModule {}
