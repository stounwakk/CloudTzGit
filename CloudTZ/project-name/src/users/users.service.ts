import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {CreateUserDto} from "./dto/create-user-dto";
import {FileService} from "../file/file.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel,
                private fileService: FileService) {}

    async createUser(dto: CreateUserDto, image: any){
        const fileName = await this.fileService.createFile(image)
        const user = await this.userRepository.create({...dto, image: fileName})
        return user
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll()
        return users
    }

    async getUserByEmail(email:string){
        const user = await this.userRepository.findOne({where: {email}})
        return user
    }

    async deleteUserByEmail(email: string){
        const candidate = await this.userRepository.findOne({where:{email}})
            if(candidate){
                await candidate.destroy()
                return 'Account deleted'
            } else {
                console.log('There is no spoon')
            }

        }


}
