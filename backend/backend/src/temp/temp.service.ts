import { Injectable } from '@nestjs/common';
import {temp} from '../dto/temp.dto';
import { PrismaService } from '../prisma.service';
@Injectable()
export class TempService {
    constructor(private prisma: PrismaService){}
    async insertTemp(insertTempDto: temp){
        const savedReading = await this.prisma.sensor_readings.create({
      data: insertTempDto,
    });

    return { 
      message: 'data received', 
      data: savedReading 
    };
    }

}
