import {Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FilesModule } from './files/files.module';


@Module( {

    imports: [MongooseModule.forRoot('mongodb+srv://stounwakk:root.pw@cloudfiles.gjhjk.mongodb.net/CloudFiles?retryWrites=true&w=majority'),


    FilesModule
    ]
})

export class AppModule{}