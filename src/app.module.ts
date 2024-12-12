import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { ClaimsModule } from './modules/claims/claims.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/warranty'),
    ProductsModule,
    UsersModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
