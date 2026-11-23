import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TempController } from './temp/temp.controller';
import { TempService } from './temp/temp.service';
import { TempModule } from './temp/temp.module';
import { PrismaModule } from './prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [TempModule,PrismaModule, KafkaModule, EventsModule,ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
