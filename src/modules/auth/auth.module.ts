/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, DatabaseService],
  exports: [AuthService]
})
export class AuthModule { }

