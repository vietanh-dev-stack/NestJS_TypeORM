import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthService } from 'src/modules/auth/auth.service';
import { DatabaseService } from 'src/db/database.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, DatabaseService],
  exports: [UserService],
})
export class UserModule {}
