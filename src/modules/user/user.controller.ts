import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  index(@Query() query: any) {
    return [this.userService.getUsers(), this.authService.login()];
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return `user ${id}`;
  }
}
