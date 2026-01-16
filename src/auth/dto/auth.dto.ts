import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({ example: '9876543210' })
  phone: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '9876543210' })
  phone: string;

  @ApiProperty({ example: '1234' })
  otp: string;
}
