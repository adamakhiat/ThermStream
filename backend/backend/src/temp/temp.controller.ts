import { Controller, Get,Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { temp } from '../dto/temp.dto';
import { UsePipes,ValidationPipe } from '@nestjs/common';
import { TempService } from './temp.service';
@Controller('temp')
export class TempController {
  constructor(private readonly TempService:TempService) {}
    @Get()
    temp():string{
        return "hello"
    }
    @Post()
    @UsePipes(new ValidationPipe())
    insert(@Body() insertTempDto: temp) {
        console.log("data recieved")
    return this.TempService.insertTemp(insertTempDto)
  }
    
}
