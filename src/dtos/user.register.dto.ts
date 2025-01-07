import {
  IsEmail,
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Role } from 'src/helpers/constants';

export class UserRegisterDto {
  @ApiProperty({
    description: 'Prefix for the user, e.g., Mr, Mrs',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  prefix?: string;

  @ApiProperty({
    description: 'First name of the user',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  fname: string;

  @ApiProperty({
    description: 'Last name of the user',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  lname: string;

  @ApiProperty({
    description: 'User email address',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Profile image URL of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty({
    description: 'User password for authentication',
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Preferred language of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiProperty({
    description: 'Gender of the user',
    required: false,
    enum: Gender,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: 'Martial status of the user (e.g., Single, Married)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  martialStatus?: string;

  @ApiProperty({
    description: 'Blood group of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiProperty({
    description: 'Contact number of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  contactNo?: string;

  @ApiProperty({
    description: 'Alternate contact number of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  alterContactNO?: string;

  @ApiProperty({
    description: 'Family contact number of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  familyContactNO?: string;

  @ApiProperty({
    description: 'Facebook profile URL of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty({
    description: 'Twitter profile URL of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty({
    description: 'First custom field for additional user data',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  socialMedia1?: string;

  @ApiProperty({
    description: 'Second custom field for additional user data',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  socialMedia2?: string;

  @ApiProperty({
    description: 'Custom field for any extra information about the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  customField1?: string;

  @ApiProperty({
    description: 'Another custom field for additional information',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  customField2?: string;

  @ApiProperty({
    description: 'Additional custom field for further user data',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  customField3?: string;

  @ApiProperty({
    description: 'Final custom field for extra data if needed',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  customField4?: string;

  @ApiProperty({
    description: 'Guardian name for the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  guardianName?: string;

  @ApiProperty({
    description: 'ID proof document name (e.g., Passport, ID card)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  idProofName1?: string;

  @ApiProperty({
    description: 'Second ID proof document name',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  idProofName2?: string;

  @ApiProperty({
    description: 'Permanent address of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  permanentAddress?: string;

  @ApiProperty({
    description: 'Current address of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  currentAddress?: string;

  // Bank Details
  @ApiProperty({
    description: "Account holder name for the user's bank account",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  accountHolderName?: string;

  @ApiProperty({
    description: 'Bank account number of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiProperty({
    description: "Bank name of the user's account",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiProperty({
    description: "Branch name of the user's bank account",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  branchName?: string;

  @ApiProperty({
    description: 'Taxpayer ID of the user',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  texPayerId?: string;

  @ApiProperty({
    description: "Bank Identifier Code (BIC) for the user's bank",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  bankIdentifierCode?: string;

  // Role with default value of "user"
  @ApiProperty({
    description: 'Role of the user (e.g., admin, user, superadmin)',
    enum: Role,
    required: false,
    default: Role.User,
  })
  @IsOptional()
  @IsEnum(Role)
  roleName: Role = Role.User;
}
