import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import { TempController } from './temp.controller';
import { TempService } from './temp.service';
@Module({
  imports: [KafkaModule],
  controllers: [TempController],   
  providers: [TempService],
})
export class TempModule {
    
}
