/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  index(@Query() query: any) {
    return {
      keyword: query.keyword,
      category: query.category,
    };
  }

  @Get('/:id')
  find(@Param('id') id: string) {
    return `user ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
}
