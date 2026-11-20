import { Injectable,OnModuleDestroy,OnModuleInit } from '@nestjs/common';
import {temp} from '../dto/temp.dto';
import { PrismaService } from '../prisma.service';
import { Kafka,Consumer,EachBatchPayload } from 'kafkajs';

@Injectable()
export class TempService {
  private consumer : Consumer;
    constructor(private prisma: PrismaService){
      const kafka = new Kafka({clientId:'worker',brokers:['localhost:9092']})
      this.consumer = kafka.consumer({groupId:'event-writer'})
    }
    
    async onModuleInit() {
  await this.consumer.connect();
  await this.consumer.subscribe({ topic: 'events', fromBeginning: false });

  await this.consumer.run({
    eachBatchAutoResolve: false,
    partitionsConsumedConcurrently: 3,
    eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
       const rows = batch.messages.map((m) => JSON.parse(m.value!.toString()));

      await this.prisma.sensor_readings.createMany({
        data:rows
      });

      const last = batch.messages[batch.messages.length - 1];
      resolveOffset(last.offset);
      await commitOffsetsIfNecessary();
      await heartbeat();
    },
  });
}
     

}
