import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  uid: string;

  @IsString()
  @ApiProperty({ type: 'string', required: true })
  provider: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  email: string;
}
