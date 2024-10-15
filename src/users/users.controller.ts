import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  getOne(@Query('id') id: string) {
    return this.usersService.getOne(id);
  }

  @Get('list')
  getList(
    @Query('projectId') projectId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<object> {
    return this.usersService.getList(projectId, startDate, endDate);
  }

  @Post()
  create(@Body() createUserDto: object) {
    return this.usersService.create(createUserDto);
  }
}
