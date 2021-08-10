import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: ['amqps://suuvemfg:3DlB-tHvRxPYP3gBgBOhERF7Fd6n_40C@cow.rmq2.cloudamqp.com/suuvemfg'],
                queue: 'files_queue',
                queueOptions: {
                    durable: false
                },
            },
        });

    app.listen()
}

bootstrap();