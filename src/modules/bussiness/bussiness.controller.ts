import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseModel } from 'src/helpers/responseModel';
import { CreateBusinessDto } from 'src/dtos/bussiness.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationQueryDto } from 'src/dtos/pagination.dto';
import { RolesGuard } from 'src/helpers/role.guard';
import { Role } from 'src/helpers/constants';
import { Roles } from 'src/helpers/roles.decorators';
import { UpdateBusinessDto } from 'src/dtos/updateBussinessdto';

// @ApiBearerAuth()
@ApiTags('Register Bussiness')
@Controller('bussiness')
export class BussinessController {
  constructor(private readonly bussinessService: BussinessService) {}
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Register new Bussiness by Superadmin' })
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
  @ApiOperation({
    summary: 'Get All Registered Business details by superadmin',
  })
  @ApiQuery({ name: 'search', required: false, description: 'Search term' })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    required: false,
  })
  findAllBusinesses(@Query() query: PaginationQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    query.page = Number(page);
    query.limit = Number(limit);
    console.log(query, 'this is a pagination query');
    const response = this.bussinessService.findAll(query);
    return new ResponseModel(
      true,
      response,
      'Bussiness retrieved successfully',
      null,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'superadmin will get bussiness details base on ID' })
  findOne(@Param('id') id: string) {
    const response = this.bussinessService.findOne(+id);
    return new ResponseModel(
      true,
      response,
      'Bussiness retrieved successfully',
      null,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateBusinessDto) {
    const response = this.bussinessService.update(+id, body);
    return new ResponseModel(
      true,
      response,
      'Bussiness updated successfully',
      null,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.bussinessService.remove(+id);
    return new ResponseModel(
      true,
      null,
      'Bussiness deleted successfully, null',
      null,
    );
  }
}
