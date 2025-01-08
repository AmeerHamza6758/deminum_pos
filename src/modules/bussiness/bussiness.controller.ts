import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseModel } from 'src/helpers/responseModel';
import { CreateBusinessDto } from 'src/dtos/bussiness.dto';

@Controller('bussiness')
@ApiTag('new Bussiness')
@ApiBearerAuth()
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}

  @Post()
  create(@Body() createBussinessDto: CreateBusinessDto) {
    const response = this.bussinessService.createBussiness(createBussinessDto);
    return new ResponseModel(
      true,
      response,
      'Bussiness created successfully',
      null,
    );
  }

  @Get()
  findAll() {
    return this.bussinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bussinessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBussinessDto: any) {
    return this.bussinessService.update(+id, updateBussinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bussinessService.remove(+id);
  }
}
function ApiTag(
  arg0: string,
): (target: typeof BussinessController) => void | typeof BussinessController {
  throw new Error('Function not implemented.');
}
