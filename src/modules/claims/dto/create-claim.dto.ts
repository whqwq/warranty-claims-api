import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['pending', 'approved', 'rejected'])
  @IsOptional() // default: pending
  status?: 'pending' | 'approved' | 'rejected' = 'pending';

  @IsString()
  @IsOptional()
  reply?: string;
}
