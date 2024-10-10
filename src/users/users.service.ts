import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll(): string {
    return 'Request function is findAll';
  }

  findOne(id, userType): string {
    return `response is ${id} and ${userType}`;
  }
  create(createUserDto): string {
    return `response is ${JSON.stringify(createUserDto)}`;
  }
}
