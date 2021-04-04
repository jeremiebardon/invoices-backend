import { Body, Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guards';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './services/users.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getProfile() {
    return 'ok';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = await this.usersService.validateUser(req.body.email, req.body.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @Get('validate/:token')
  confirmUser(@Param('token') token: string): Promise<User> {
    return this.usersService.confirmUser(token);
  }
}
