import { isDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class temp {
  @IsString()
  @IsNotEmpty()
  sensor_id: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsString()
  @IsNotEmpty()
  metric: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

}

//{'sensor_id': 'temp_sensor_01', 'timestamp': '2026-11-14T13:10:07.453569', 'metric': 'temperature', 'value': 37.60271511523883, 'unit': 'Celsius'}