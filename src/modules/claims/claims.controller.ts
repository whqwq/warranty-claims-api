import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Body() createClaimDto: CreateClaimDto) {
    return this.claimsService.createClaim(createClaimDto);
  }

  @Get()
  findAll() {
    return this.claimsService.findAllClaims();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claimsService.findClaimById(id);
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.claimsService.findClaimsByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaimDto: UpdateClaimDto) {
    return this.claimsService.updateClaim(id, updateClaimDto);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.claimsService.updateClaim(id, { status: 'approved' });
  }

  @Patch(':id/reject')
  reject(@Param('id') id: string, @Body() rejectReason: { content: string }) {
    return this.claimsService.updateClaim(id, {
      status: 'rejected',
      reply: rejectReason.content,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claimsService.deleteClaim(id);
  }
}
