import {AppModule} from "./app.module";
import {NestFactory} from "@nestjs/core";
import {Transport} from "@nestjs/microservices";

// async function bootstrap() {
//     const app = await NestFactory.createMicroservice(
//         AppModule,
//         {
//             transport: Transport.RMQ,
//             options: {
//                 urls: ['amqps://suuvemfg:3DlB-tHvRxPYP3gBgBOhERF7Fd6n_40C@cow.rmq2.cloudamqp.com/suuvemfg'],
//                 queue: 'main_queue',
//                 queueOptions: {
//                     durable: false
//                 },
//             },
//         });
//
//     app.listen()
// }
//
// bootstrap();



async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

}


start()