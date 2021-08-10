import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { UsersController } from './users/users.controller';
import { FileService } from './file/file.service';
import {UserModel} from "./users/user.model";


@Module({
    controllers:[UsersController],
    providers:[FileService],
    imports:[
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'techz',
            models: [UserModel],
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        FileModule,
    ]
})
export class AppModule {}