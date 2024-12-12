import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(['customer', 'staff'], {
    message: 'Role must be either customer or staff',
  })
  role: 'customer' | 'staff';
}
