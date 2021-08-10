import {Body, Controller, Delete, Get, Inject, Post, UploadedFile} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user-dto";
import {UsersService} from "./users.service";
import {ClientProxy} from "@nestjs/microservices";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }


    @Post()
    create(@Body() userDto: CreateUserDto,
           @UploadedFile() image: any) {
        return this.usersService.createUser(userDto, image)
    }

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @Delete()
    async deleteUser(@Body() user: any){
        return await this.usersService.deleteUserByEmail(user.email)
    }
}
