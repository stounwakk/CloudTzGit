import {Body, Get, Post, Put, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import {FilesService} from "./files.service";
import {CreateFileDto} from "./dto/create-file-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {EventPattern} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";
import {fileDocument} from "./files.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateDirDto} from "./dto/create-dir-dto";
import { Delete } from '@nestjs/common';
import {diskStorage} from "multer";

@Controller('files')
export class FilesController {
    constructor(
        private filesService: FilesService,
        private jwtService: JwtService,
        @InjectModel('File') private filesModel: Model<fileDocument>
    ) {}


    @EventPattern('logined')
    async getLoginedMessage(data: any) {
        console.log(data.token)
        console.log(this.jwtService.verify(data.token))
    }


    @EventPattern('registered')
    async getRegisteredMessage(data: any) {
        console.log(data)
        const userId = this.jwtService.verify(data.token).id
        console.log(userId)
        return await this.filesService.createDirForReg(userId)
    }

    @EventPattern('deleted')
    async deleteUsersHolder(data: any){
        const userId = new this.filesModel({ user:this.jwtService.verify(data.token) })

        return await this.filesService.deleteDirByUserId(userId)

    }



    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async create (@Body() filesDto: CreateFileDto,
            @UploadedFile() file: Express.Multer.File) {
        console.log(file)
        return await this.filesService.uploadFile(file, filesDto)
    }


    @Post('/dirMaker')
    async makeDir(@Body() dirDto: CreateDirDto){
        return this.filesService.createDir(dirDto)
    }

    // @Put('/upload')
    // @UseInterceptors(FileInterceptor('file'))
    // async update(@Query() id : Record<string, any>,
    //              @UploadedFile() file: Express.Multer.File){
    //     return this.filesService.fileUpdator(id,file)
    // }

    @Get()
    getFiles(@Query() user: Record<string,any>){
        console.log(user)
        return this.filesService.getFilesByUserId(user)
    }

    @Delete()
    async deleteFile(@Query() query : Record<string,any>) {
     return this.filesService.deleteFileById(query)
    }
}
