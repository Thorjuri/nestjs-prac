import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll(): string {
    return 'Request function is findAll';
  }
  findOne(id): string {
    return `response is ${id}`;
  }
  create(createUserDto): string {
    return `response is ${JSON.stringify(createUserDto)}`;
  }
}
