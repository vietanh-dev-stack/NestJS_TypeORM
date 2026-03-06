/* eslint-disable prettier/prettier */
import { Injectable, Scope } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(private readonly db: DatabaseService) {
    console.log('user service created');
  }
  getUsers() {
    return this.db.findAll();
  }
}


// Defaul (singleton): 1 instance cho toàn app
// REQUEST: 1 instance cho mỗi request
// TRANSIENT: mỗi lần inject tạo instance mới  