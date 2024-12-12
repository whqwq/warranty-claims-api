import { IsInt, IsOptional, Min, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  modelNumber: string;

  @IsInt()
  @Min(0)
  warrantyPeriod: number; // Warranty in months

  @IsOptional() // Remark is optional
  remark?: string;
}
