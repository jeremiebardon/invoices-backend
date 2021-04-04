import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { User } from '../interfaces/user.interface';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async confirmUser(confirmToken: string): Promise<User> {
    const user = await this.userModel.findOne({ confirmToken });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'User already validate',
          errorCode: 1002,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return await this.userModel.findOneAndUpdate(
      { confirmToken },
      { activated: true, confirmToken: null },
      { new: true },
    );
  }

  async register(user: User): Promise<User> {
    const findUser = await this.userModel.findOne({ email: user.email });

    if (findUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'User already exist',
          errorCode: 1001,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const confirmToken = this.authService.generateValidationToken();
    const password = await this.authService.hashPassword(user.password);

    const newItem = new this.userModel({ ...user, password, confirmToken });

    await this.confirmationEmail(user.email, `http://localhost:4200/validate/${confirmToken}`);

    return await newItem.save();
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Email or password are incorrect',
          errorCode: 1003,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const pass = await this.authService.validatePassword(password, user.password);

    if (!pass) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Email or password are incorrect',
          errorCode: 1003,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!user.activated) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Unactivated user',
          errorCode: 1004,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  private async confirmationEmail(to: string, url: string) {
    return this.mailerService.sendMail({
      to,
      from: 'noreply@nestjs.com',
      subject: 'Invoices - Confirm email',
      text: 'Activate your account',
      html: `Welcolme to invoice app: <a href="${url}"> Confirm your account </a>`,
    });
  }
}
