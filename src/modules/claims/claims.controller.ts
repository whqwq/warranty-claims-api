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
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Request() req, @Body() createClaimDto: CreateClaimDto) {
    if (req.user.role !== 'customer') {
      throw new HttpException(
        'only customer make claim!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.claimsService.createClaim(createClaimDto);
  }

  @Get()
  findAll(@Request() req) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.claimsService.findAllClaims();
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.claimsService.findClaimById(req.user, id);
  }

  @Get('user/:userId')
  findAllByUserId(@Request() req, @Param('userId') userId: string) {
    if (req.user.id !== userId) {
      throw new HttpException(
        'cannot see others claims!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.claimsService.findClaimsByUserId(userId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateClaimDto: UpdateClaimDto,
  ) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.claimsService.updateClaim(id, updateClaimDto);
  }

  @Patch(':id/approve')
  approve(@Request() req, @Param('id') id: string) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.claimsService.updateClaim(id, { status: 'approved' });
  }

  @Patch(':id/reject')
  reject(
    @Request() req,
    @Param('id') id: string,
    @Body() rejectReason: { content: string },
  ) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.claimsService.updateClaim(id, {
      status: 'rejected',
      reply: rejectReason.content,
    });
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.role !== 'staff') {
      throw new HttpException('unauthorized!', HttpStatus.UNAUTHORIZED);
    }
    return this.claimsService.deleteClaim(id);
  }
}
