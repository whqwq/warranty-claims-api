import { Injectable } from '@nestjs/common';
import { CreateClaimDto } from '../claims/dto/create-claim.dto';
import { UpdateClaimDto } from '../claims/dto/update-claim.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Claim } from './entities/claim.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClaimsService {
  constructor(@InjectModel(Claim.name) private claimModel: Model<Claim>) {}

  async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
    const newClaim = new this.claimModel(createClaimDto);
    return await newClaim.save();
  }

  async findAllClaims(): Promise<Claim[]> {
    return this.claimModel.find().exec();
  }

  async findClaimById(id: string): Promise<Claim> {
    return this.claimModel.findById(id).exec();
  }

  async findClaimsByUserId(userId: string): Promise<Claim[]> {
    return this.claimModel.find({ userId }).exec();
  }

  async updateClaim(
    id: string,
    updateClaimDto: UpdateClaimDto,
  ): Promise<Claim> {
    return this.claimModel
      .findByIdAndUpdate(id, updateClaimDto, { new: true })
      .exec();
  }

  async deleteClaim(id: string): Promise<void> {
    await this.claimModel.findByIdAndDelete(id).exec();
  }
}
