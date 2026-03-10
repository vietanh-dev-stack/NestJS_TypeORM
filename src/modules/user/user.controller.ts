import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RemovePasswordInterceptor } from 'src/common/interceptors/remove-password.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users
  @UseInterceptors(RemovePasswordInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET /users/1
  @UseInterceptors(RemovePasswordInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  // POST /users
  @UseInterceptors(RemovePasswordInterceptor)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  // PUT /users/1
  @UseInterceptors(RemovePasswordInterceptor)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(Number(id), dto);
  }

  // DELETE /users/1
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
