import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { VerifyOtpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private tempOtps: Map<string, string> = new Map(); // Use Redis in production

  constructor(private usersService: UsersService) { }

  async sendOtp(phone: string) {
    // Generate 4 digit OTP
    const otp = '1234'; // Fixed for now, random in prod: Math.floor(1000 + Math.random() * 9000).toString();
    this.tempOtps.set(phone, otp);
    console.log(`OTP for ${phone} is ${otp}`);
    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { phone, otp } = verifyOtpDto;
    const storedOtp = this.tempOtps.get(phone);

    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    // OTP Verified, clear it
    this.tempOtps.delete(phone);

    // Find or create user
    let user = await this.usersService.findOneByPhone(phone);
    if (!user) {
      user = await this.usersService.create({ phone, location: '', name: 'New User' }); // Location optional at login
    }

    return {
      message: 'Login successful',
      user,
    };
  }
}
