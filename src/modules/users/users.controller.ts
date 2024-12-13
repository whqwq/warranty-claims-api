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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'register a new user' })
  @ApiBody({ type: CreateUserDto, description: 'datastructure to create user' })
  @ApiResponse({})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  findOne(@Request() req, @Param('id') id: string) {
    if (req.user.id !== id && req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.findUserById(id);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get user details by username' })
  findByUsername(@Request() req, @Param('username') username: string) {
    if (req.user.username !== username && req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.findUserByUsername(username);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update user details' })
  @ApiBody({ type: UpdateUserDto })
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
  @ApiOperation({ summary: 'delete user' })
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.id !== id && req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.deleteUser(id);
  }
}
