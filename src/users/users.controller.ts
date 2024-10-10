import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('userType') userType: string) {
    return this.usersService.findOne(+id, userType);
  }

  @Post()
  create(@Body() createUserDto: object) {
    return this.usersService.create(createUserDto);
  }
}
