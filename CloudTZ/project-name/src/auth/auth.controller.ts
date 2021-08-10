import {Body, Controller, Delete, Inject, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "../users/dto/login-user-dto";
import {CreateUserDto} from "../users/dto/create-user-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import { ClientProxy } from '@nestjs/microservices';
import {UsersService} from "../users/users.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        @Inject('auth_service') private readonly client: ClientProxy
    ) {}

    @Post('/login')
    async login(@Body() userDto: LoginUserDto){
        await this.client.emit('logined', await this.authService.login(userDto))
        return this.authService.login(userDto)

    }

    @Post('/registry')
    @UseInterceptors(FileInterceptor('image'))
    async registry(@Body() userDto: CreateUserDto,
             @UploadedFile() image: any){
        // this.client.emit('registered', this.authService.registry(userDto, image))
        const createdUser = await this.authService.registry(userDto, image)
        if (createdUser) {
            const userForTransit = await this.usersService.getUserByEmail(userDto.email)
            await this.client.emit('registered', await this.authService.generateToken(userForTransit))
        }
        return createdUser
    }

}