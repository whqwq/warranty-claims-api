import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaimDto } from '../claims/dto/create-claim.dto';
import { UpdateClaimDto } from '../claims/dto/update-claim.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Claim } from './entities/claim.entity';
import { Model } from 'mongoose';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectModel(Claim.name) private claimModel: Model<Claim>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
    const user = await this.usersService.findUserById(createClaimDto.userId);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    const product = await this.productsService.findProductById(
      createClaimDto.productId,
    );
    if (!product) {
      throw new HttpException('Product does not exist', HttpStatus.BAD_REQUEST);
    }
    const newClaim = new this.claimModel(createClaimDto);
    return await newClaim.save();
  }

  async findAllClaims(): Promise<Claim[]> {
    return this.claimModel.find().exec();
  }

  async findClaimById(user: any, id: string): Promise<Claim> {
    const claim = await this.claimModel.findById(id).exec();
    if (!claim) {
      throw new HttpException('Claim not found', HttpStatus.NOT_FOUND);
    }
    if (claim.userId !== user.id) {
      throw new HttpException('not your claim!', HttpStatus.UNAUTHORIZED);
    }
    return claim;
  }

  async findClaimsByUserId(userId: string): Promise<Claim[]> {
    return this.claimModel.find({ userId }).exec();
  }

  async updateClaim(
    id: string,
    updateClaimDto: UpdateClaimDto,
  ): Promise<Claim> {
    const updatedClaim = await this.claimModel
      .findByIdAndUpdate(id, updateClaimDto, { new: true })
      .exec();
    if (!updatedClaim) {
      throw new HttpException('Claim not found', HttpStatus.NOT_FOUND);
    }
    return updatedClaim;
  }

  async deleteClaim(id: string): Promise<void> {
    const deletedClaim = await this.claimModel.findByIdAndDelete(id).exec();
    if (!deletedClaim) {
      throw new HttpException('Claim not found', HttpStatus.NOT_FOUND);
    }
  }
}
