import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      const response = await this.authService.register(
        body.email,
        body.password,
        body.displayName,
        body.phone,
      );
      return response; // Success response
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: 'error',
          message: error.message || 'Registration failed',
        };
      } else {
        return {
          status: 'error',
          message: 'Terjadi kesalahan tidak diketahui',
        };
      }
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const response = await this.authService.login(body.email, body.password);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          status: 'error',
          message: error.message || 'Login failed',
        };
      } else {
        return {
          status: 'error',
          message: 'Terjadi kesalahan tidak diketahui',
        };
      }
    }
  }
}
