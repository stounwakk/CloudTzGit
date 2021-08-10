import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as fs from 'fs';
import * as path from 'path';
import {File, fileDocument} from "./files.model";
import {CreateFileDto} from "./dto/create-file-dto";
import {CreateDirDto} from "./dto/create-dir-dto";
import {query} from "express";


@Injectable()
export class FilesService {

    constructor(@InjectModel('File') private filesModel: Model<fileDocument>) {}

    async uploadFile(file: any, fileFields: CreateFileDto ){
        try {
                const fileName = file.originalname
            console.log(fileFields.parent)
                const parent = await this.filesModel.findOne({_id: fileFields.parent, user: fileFields.user})
            console.log('shas budet parent')
            console.log(parent)

                let path
                if (parent) {
                    path = `C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${fileFields.user}\\${parent.path}\\${fileName}`
                } else {
                    path = `C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${fileFields.user}\\${fileName}`
                }
                if (fs.existsSync(path)) {
                    return 'File already exists'
                }
                await this.createFileToDB(fileFields, fileName)
            fs.renameSync(`C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${file.filename}`,path)

            } catch (err) {
                throw  err
            }



    }


    async createFileToDB(file : CreateFileDto, fileName: string){
        try{
            const createdFile = new File()
            const parentFile = await this.filesModel.findOne({user: file.user, _id: file.parent}).exec()
            createdFile.name = fileName
            createdFile.type = fileName.split('.').pop()
            createdFile.user = file.user
            //console.log(parentFile)
            if (parentFile) {
                createdFile.parent = parentFile._id
            } else {
                createdFile.parent = null
            }
            if (!parentFile) {
                createdFile.path = fileName
            } else {
                createdFile.path = `${parentFile.path}\\${fileName}`
            }
            const newFile = await this.filesModel.create(createdFile)
           if (parentFile) {
               parentFile.childs.push(newFile._id)
               await parentFile.save()
           }

           // console.log(createdFile)
            return createdFile
        } catch (e){
            console.log(e)
            throw e
        }

    }

    async createDir(dirFields : CreateDirDto) {
            try {
                let filePath = ''
                const parentFile = await this.filesModel.findOne({user: dirFields.user, _id: dirFields.parent}).exec()
                if (parentFile) {
                    filePath = `C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${dirFields.user}\\${dirFields.parent}\\${dirFields.name}`
                } else {
                    filePath = `C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${dirFields.user}\\${dirFields.name}`
                }
                    if (!fs.existsSync(filePath)) {
                        fs.mkdirSync(filePath)
                        return 'Directory has been created'
                    } else {
                        return 'Directory already exists'
                    }

                } catch (e) {
                throw e
            }
    }

    async createDirForReg(userId) {
        try {
            const filePath = `C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${userId}`
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                return 'Directory has been created'
            } else {
                return 'Directory already exists'
            }
        } catch (e) {
            throw e
        }
    }




    async getFilesByUserId(user) {
       const files = await this.filesModel.find({user: user.id})
        console.log(files)
        return files
    }

    // async fileUpdator(query, file:any) {
    //     const oldFile = await this.filesModel.findOne({_id:query.id})
    //     await this.filesModel.findOneAndUpdate({_id:query.id},{updatedAt:Date.now()})
    //     console.log(oldFile)
    //     const path = oldFile.path
    //     oldFile.version = oldFile.version + 1
    //     fs.renameSync(`C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${file.filename}`,path)
    //
    // }

    async deleteFileById(query) {
        const files = await this.filesModel.findOneAndDelete({_id: query.id})

    }

    async deleteDirByUserId(userId: any) {
        await fs.rmdir(`C:\\Users\\Вован Грозный\\WebstormProjects\\CloudTzFiles\\cloud-tz-files\\fileHolder\\${userId}`,(err)=> {
            throw err
        })
        const files = await this.filesModel.findByIdAndRemove(userId)

        return files
    }
}
