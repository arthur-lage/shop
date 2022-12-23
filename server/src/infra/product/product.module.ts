import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';

import { GetAllProducts } from '../../application/use-cases/products/get-all/get-all-products';
import { GetProductById } from '../../application/use-cases/products/get-by-id/get-product-by-id';
import { CreateProduct } from '../../application/use-cases/products/create/create-product';
import { UpdateProduct } from 'src/application/use-cases/products/update/update-product';
import { DeleteAllProducts } from '../../application/use-cases/products/delete-all/delete-all-products';
import { DeleteProductById } from 'src/application/use-cases/products/delete-by-id/delete-product-by-id';
import { PrismaService } from '../database/prisma/prisma.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    GetAllProducts,
    GetProductById,
    CreateProduct,
    UpdateProduct,
    DeleteAllProducts,
    DeleteProductById,
    PrismaService,
  ],
})
export class ProductModule {}
