import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
  Matches,
  Length,
} from 'class-validator';

export class UpdateBusinessDto {
  @ApiProperty({
    description: 'Name of the business',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  bussinessName?: string;

  @ApiProperty({
    description: 'Start date of the business (ISO 8601 format)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({
    description: 'Currency used by the business',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({
    description: 'URL of the business logo',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUrl()
  logo?: string;

  @ApiProperty({
    description: 'Website of the business',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: 'Primary contact number of the business',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/)
  @Length(10, 15)
  bussinessContactNumber?: string;

  @ApiProperty({
    description: 'Alternative contact number of the business',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/)
  @Length(10, 15)
  alterContactNumber?: string;

  @ApiProperty({
    description: 'Country where the business is located',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'State where the business is located',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'City where the business is located',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Zip code of the business location',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  zipCode?: number;

  @ApiProperty({
    description: 'Landmark near the business location',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  landMark?: string;

  @ApiProperty({
    description: 'Timezone of the business location',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  timeZone?: string;
}
