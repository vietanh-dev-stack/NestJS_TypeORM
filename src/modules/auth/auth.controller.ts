/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}
}
