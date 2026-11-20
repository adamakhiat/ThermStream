import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TempController } from './temp/temp.controller';
import { TempService } from './temp/temp.service';
import { TempModule } from './temp/temp.module';
import { PrismaModule } from './prisma.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [TempModule,PrismaModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
