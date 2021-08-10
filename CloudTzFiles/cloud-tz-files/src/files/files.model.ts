import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type fileDocument = File & Document

@Schema()
export class File {
    @Prop({required:true})
    name: string
    @Prop({required:true})
    type: string
    @Prop({default: ''})
    path:string
    @Prop()
    user: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
    parent: File
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }])
    childs: File[]
    @Prop({default: Date.now})
    createdAt: Date
    @Prop({default: 1})
    version:number

}

export const fileSchema = SchemaFactory.createForClass(File)



//
// export const FileSchema = new mongoose.Schema({
//     name:{type:String, required: true},
//     type:{type:String, required: true},
//     path:{type: String, default:''},
//     user:{type: mongoose.Types.ObjectId, ref:'User'},
//     parent:{type:mongoose.Types.ObjectId, ref:'FileSchema'},
//     childs:[{type: mongoose.Types.ObjectId,ref:'FileSchema'}],
//     createdAt:{type:Date, default:Date.now },
//     version:{type:Number}
// })
//
// export  interface File{
//     id:string
//     name:string
//     type:string
//     path:string
//     user:any
//     parent:any
//     childs:any
//     createdAt:any
//     version: number
// }