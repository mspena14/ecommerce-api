import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}
  async create(createProductDto: CreateProductDto, userId: string) {

    const userLogged = await this.usersService.findOneById(userId);
    const productCreated = await this.productsRepository.create({
      seller: userLogged,
      ...createProductDto,
      
    })
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    return `This action updates a #${id} product`;
  }

  remove(id: string, userId: string) {
    return `This action removes a #${id} product`;
  }
}
