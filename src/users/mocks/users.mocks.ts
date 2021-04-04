import { User } from '../interfaces/user.interface';

export function mockUserModel(dto: any) {
  this.data = dto;
  this.save = () => {
    return this.data;
  };
}

export const userMock: User = {
  email: 'jerber@gmail.com',
  password: 'OneSecurePassword',
};
