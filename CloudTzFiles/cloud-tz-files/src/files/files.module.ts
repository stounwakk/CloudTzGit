import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {MongooseModule} from "@nestjs/mongoose";
import { fileSchema } from './files.model';
import {JwtModule} from "@nestjs/jwt";
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports:[MongooseModule.forFeature([{name:'File',schema:fileSchema}]),
    JwtModule.register({
      secret:'secret_key',
      signOptions:{
        expiresIn: '24h'
      },
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './fileHolder',
      }),
    })
  ]
})
export class FilesModule {}