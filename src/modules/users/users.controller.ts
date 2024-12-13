import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/auth-decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    if (req.user.id !== id && req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.findUserById(id);
  }

  @Get('username/:username')
  findByUsername(@Request() req, @Param('username') username: string) {
    if (req.user.username !== username && req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.findUserByUsername(username);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (req.user.id !== id) {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.id !== id && req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.deleteUser(id);
  }
}
