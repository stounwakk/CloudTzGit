import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UserCreationAttributes {
    email: string
    password: string
    name: string
    surname: string
    image: string
}


@Table ({tableName:'users'})
export class UserModel extends Model<UserModel, UserCreationAttributes> {

    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique:true, allowNull:false})
    email: string

    @Column({type: DataType.STRING, allowNull:false})
    password: string

    @Column({type: DataType.STRING})
    name: string

    @Column({type: DataType.STRING})
    surname:string

    @Column({type: DataType.STRING})
    image: any
}