import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // GET /userrs
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET /users/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  // POST /users
  @Post()
  create(@Body() body: Partial<User>) {
    return this.userService.create(body);
  }

  // PUT //users/1
  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.userService.update(Number(id), body);
  }

  // DELETE /users/1
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
