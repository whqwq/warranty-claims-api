import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.password || createUserDto.password.trim() === '') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Password required!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
