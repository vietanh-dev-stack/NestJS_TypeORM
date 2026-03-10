import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/modules/category/category.entity';
import { CreateCateDto } from 'src/modules/category/dto/create-cate.dto';
import { UpdateCateDto } from 'src/modules/category/dto/update-cate.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  async create(createCateDto: CreateCateDto) {
    const cate = this.categoryRepository.create({ ...createCateDto });
    return this.categoryRepository.save(cate);
  }

  async update(id: number, data: UpdateCateDto) {
    const cate = await this.findOne(id);
    if (!cate) {
      throw new NotFoundException('Cate not found');
    }
    await this.categoryRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    const cate = await this.findOne(id);
    if (!cate) {
      throw new NotFoundException('Cate not found');
    }
    await this.categoryRepository.delete(id);
    return { message: 'Cate deleted successfully' };
  }
}
