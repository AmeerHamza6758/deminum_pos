import { ApiProperty } from '@nestjs/swagger';

export class CreateBusinessDto {
  @ApiProperty({
    description: 'Name of the business',
    type: String,
    required: true,
  })
  bussinessName: string;

  @ApiProperty({
    description: 'Start date of the business (ISO 8601 format)',
    type: String,
    required: true,
  })
  startDate: string;

  @ApiProperty({
    description: 'Currency used by the business',
    type: String,
    required: true,
  })
  currency: string;

  @ApiProperty({
    description: 'URL of the business logo',
    type: String,
    required: true,
  })
  logo: string;

  @ApiProperty({
    description: 'Website of the business',
    type: String,
    required: false,
  })
  website: string;

  @ApiProperty({
    description: 'Primary contact number of the business',
    type: String,
    required: true,
  })
  bussinessContactNumber: string;

  @ApiProperty({
    description: 'Alternative contact number of the business',
    type: String,
    required: false,
  })
  alterContactNumber: string;

  @ApiProperty({
    description: 'Country where the business is located',
    type: String,
    required: true,
  })
  country: string;

  @ApiProperty({
    description: 'State where the business is located',
    type: String,
    required: true,
  })
  state: string;

  @ApiProperty({
    description: 'City where the business is located',
    type: String,
    required: true,
  })
  city: string;

  @ApiProperty({
    description: 'Zip code of the business location',
    type: Number,
    required: true,
  })
  zipCode: number;

  @ApiProperty({
    description: 'Landmark near the business location',
    type: String,
    required: false,
  })
  landMark: string;

  @ApiProperty({
    description: 'Timezone of the business location',
    type: String,
    required: true,
  })
  timeZone: string;
}
