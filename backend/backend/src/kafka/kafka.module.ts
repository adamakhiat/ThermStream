import { Module } from '@nestjs/common';
import {ClientsModule,Transport } from '@nestjs/microservices'; 

@Module({
    imports:[
        ClientsModule.register([
            {
                name:'KAFKA-SERVICE',
                transport: Transport.KAFKA,
                options:{
                    client: {clientId:'api',brokers:['localhost:9092']},
                    producer:{allowAutoTopicCreation: false}
                },
            },
        ]),
    ],
    exports: [ClientsModule]
})
export class KafkaModule {}
