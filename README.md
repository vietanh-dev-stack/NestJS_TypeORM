# NestJS Notes

## 1. Giới thiệu NestJS

**NestJS** là framework backend cho Node.js được xây dựng bằng **TypeScript** và dựa trên kiến trúc **modular + dependency injection**.

NestJS sử dụng nhiều concept của Angular như:

* Module
* Controller
* Service
* Dependency Injection

NestJS thường dùng để xây dựng:

* REST API
* GraphQL API
* Microservices
* Real-time apps

---

# 2. Kiến trúc cơ bản

Một project NestJS thường có cấu trúc:

```
src
 ├── app.module.ts
 ├── main.ts
 │
 ├── modules
 │   ├── user
 │   │   ├── user.module.ts
 │   │   ├── user.controller.ts
 │   │   ├── user.service.ts
 │   │   └── user.entity.ts
 │
 │   ├── post
 │   └── auth
```

Luồng request:

```
Client Request
      ↓
Middleware
      ↓
Guard
      ↓
Interceptor (before)
      ↓
Controller
      ↓
Service
      ↓
Database
      ↓
Interceptor (after)
      ↓
Response
```

---

# 3. Module

Module là đơn vị tổ chức code trong NestJS.

```
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: []
})
```

Ví dụ:

```ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
```

Giải thích:

| Thành phần  | Mục đích                |
| ----------- | ----------------------- |
| imports     | import module khác      |
| controllers | định nghĩa API          |
| providers   | service hoặc provider   |
| exports     | cho module khác sử dụng |

---

# 4. Controller

Controller dùng để định nghĩa **API endpoints**.

```ts
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

}
```

Decorators thường dùng:

| Decorator  | Mục đích    |
| ---------- | ----------- |
| @Get()     | GET API     |
| @Post()    | POST API    |
| @Put()     | UPDATE      |
| @Delete()  | DELETE      |
| @Param()   | lấy param   |
| @Body()    | lấy body    |
| @Request() | lấy request |

---

# 5. Service

Service chứa **business logic**.

```ts
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  findAll() {
    return this.userRepo.find();
  }

}
```

---

# 6. Dependency Injection

Dependency Injection (DI) là cơ chế **NestJS tự động cung cấp dependency cho class**.

Ví dụ:

```
UserController → cần UserService
UserService → cần Repository<User>
```

NestJS tự inject:

```ts
constructor(private readonly userService: UserService) {}
```

Lợi ích:

* loose coupling
* dễ test
* dễ maintain

---

# 7. Provider

Provider là class được NestJS quản lý và inject.

Ví dụ:

```
Service
Repository
Custom Provider
Factory
```

Custom provider:

```
{
  provide: 'CONFIG',
  useValue: { port: 3000 }
}
```

---

# 8. Entity (TypeORM)

Entity đại diện cho bảng database.

```ts
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

}
```

---

# 9. Repository

Repository dùng để thao tác database.

```
@InjectRepository(User)
private readonly repo: Repository<User>
```

Các method phổ biến:

```
find()
findOne()
save()
update()
delete()
create()
```

---

# 10. DTO (Data Transfer Object)

DTO dùng để validate dữ liệu input.

Ví dụ:

```
create-user.dto.ts
```

```ts
export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  password: string;

}
```

Sử dụng:

```
@Post()
create(@Body() dto: CreateUserDto)
```

---

# 11. Validation

NestJS dùng:

```
class-validator
class-transformer
```

Enable global validation:

```
app.useGlobalPipes(new ValidationPipe());
```

---

# 12. Authentication (JWT)

NestJS thường dùng JWT.

Flow:

```
Login
   ↓
generate JWT
   ↓
Client gửi token
   ↓
Guard verify token
```

JWT strategy:

```
PassportStrategy
```

Guard:

```
@UseGuards(JwtAuthGuard)
```

---

# 13. Guards

Guard dùng để **kiểm tra quyền truy cập API**.

Ví dụ:

```
AuthGuard
RolesGuard
```

Lifecycle:

```
Request → Guard → Controller
```

---

# 14. Interceptor

Interceptor có thể:

* transform response
* logging
* caching
* timeout

Ví dụ:

```
@Injectable()
export class TransformInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler) {

    return next.handle().pipe(
      map(data => ({
        success: true,
        data
      }))
    );

  }

}
```

---

# 15. Middleware

Middleware chạy trước controller.

Ví dụ:

```
Logger middleware
CORS
body parser
```

---

# 16. Exception Filter

Dùng để xử lý lỗi global.

```
@Catch(HttpException)
```

---

# 17. Relation (TypeORM)

Các loại quan hệ:

| Quan hệ    | Ví dụ          |
| ---------- | -------------- |
| OneToMany  | User → Posts   |
| ManyToOne  | Post → User    |
| ManyToMany | Post → Tags    |
| OneToOne   | User → Profile |

Ví dụ:

```
User 1 --- n Post
```

```ts
@OneToMany(() => Post, post => post.user)
posts: Post[];
```

---

# 18. QueryBuilder

Dùng cho query phức tạp.

```
createQueryBuilder()
```

Ví dụ:

```
postRepository
  .createQueryBuilder("post")
  .leftJoinAndSelect("post.user", "user")
  .getMany()
```

---

# 19. Pagination

Ví dụ:

```
GET /posts?page=1&limit=10
```

```
skip = (page-1)*limit
take = limit
```

---

# 20. Cấu trúc backend blog system

Ví dụ hệ thống:

```
User
Post
Comment
Like
Category
Auth
```

Quan hệ:

```
User
 ├── Posts
 ├── Comments
 └── Likes

Post
 ├── Comments
 ├── Likes
 └── Category
```

---

# 21. Best Practices

* tách module rõ ràng
* dùng DTO validate input
* không return password
* dùng interceptor transform response
* dùng guard cho authentication

---

# 22. Thứ tự request lifecycle

```
Request
 ↓
Middleware
 ↓
Guard
 ↓
Interceptor (before)
 ↓
Pipe
 ↓
Controller
 ↓
Service
 ↓
Interceptor (after)
 ↓
Response
```

---

# 23. Kiến trúc production

Một backend NestJS lớn thường có:

```
common
 ├── interceptors
 ├── filters
 ├── decorators
 └── guards

modules
 ├── auth
 ├── users
 ├── posts
 ├── comments
 └── likes
```

---

# 24. Công nghệ thường đi cùng NestJS

* PostgreSQL
* TypeORM / Prisma
* Redis
* Docker
* Swagger
* GraphQL
* WebSocket

---

# 25. Mục tiêu khi học NestJS

Có thể xây dựng:

* Blog API
* Social Network API
* E-commerce API
* Real-time chat
* Microservices

---

# End
