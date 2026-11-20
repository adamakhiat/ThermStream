import { Controller, Get,Inject,Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { temp } from '../dto/temp.dto';
import { UsePipes,ValidationPipe } from '@nestjs/common';
import { TempService } from './temp.service';
import { ClientKafka } from '@nestjs/microservices';
@Controller('temp')
export class TempController {
  constructor(
    @Inject('KAFKA-SERVICE') private readonly kafka:ClientKafka,
    private readonly TempService:TempService
    
  ) {}
  async onModuleInit(){
    await this.kafka.connect();
  }
    @Get()
    temp():string{
        return "hello"
    }
    @Post()
    @UsePipes(new ValidationPipe())
    insert(@Body() insertTempDto: temp) {
      this.kafka.emit('events', {
    key: String(insertTempDto.sensor_id),
    value: {
      sensor_id: insertTempDto.sensor_id,
      timestamp: insertTempDto.timestamp,
      metric: insertTempDto.metric,
      value: insertTempDto.value,
      unit: insertTempDto.unit,
    },
  });
        console.log("data recieved")
    return {accepted:true}
  }
    
}
