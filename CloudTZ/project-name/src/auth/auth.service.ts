import { HttpException, HttpStatus, Injectable, UnauthorizedException, UploadedFile} from '@nestjs/common';
import {UserModel} from "../users/user.model";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {LoginUserDto} from "../users/dto/login-user-dto";
import * as bcrypt from 'bcryptjs';
import {CreateUserDto} from "../users/dto/create-user-dto";
import {FileService} from "../file/file.service";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private fileService: FileService ) {}

    async login(userDto: LoginUserDto ){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }


    async registry(userDto: CreateUserDto, image: any){
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if(candidate){
            throw new HttpException('Адрес занят',HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 6)
        const user = await this.usersService.createUser({...userDto, password: hashPassword},image)
        const userForToken = await this.usersService.getUserByEmail(userDto.email)
        return this.generateToken(userForToken)
    }

    private async validateUser(userDto: LoginUserDto) {
        console.log(userDto)
        const user = await this.usersService.getUserByEmail(userDto.email)
        const password = await bcrypt.compare(userDto.password, user.password)
        if(user && password){
            return user
        }
        throw new UnauthorizedException({message:'Что-то неверно'})
    }

    async generateToken(user: UserModel) {
        const payload = {email: user.email, id: user.id}
        return{
            token: this.jwtService.sign(payload)
        }

    }
}
