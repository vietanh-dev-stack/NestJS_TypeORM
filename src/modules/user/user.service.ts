import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByName(name: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {name},
    })
  }

  async create(createUserDto: CreateUserDto) {

    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    )

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    })

    return this.userRepository.save(user)
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.password) {
      const saltRounds = 10
      data.password = await bcrypt.hash(data.password, saltRounds)
    }

    await this.userRepository.update(id, data);

    return this.findOne(id);
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);

    return { message: 'User deleted' };
  }
}