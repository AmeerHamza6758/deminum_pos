import {
  IsEmail,
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { Gender, Role } from 'src/helpers/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_register')
export class UserRegisterSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Column({
    comment: 'Prefix for the user, e.g., Mr, Mrs',
    nullable: true,
  })
  prefix: string;

  @IsString()
  @IsNotEmpty()
  @Column({ comment: 'First name of the user', nullable: false })
  fname: string;

  @IsString()
  @IsNotEmpty()
  @Column({ comment: 'Last name of the user', nullable: false })
  lname: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ comment: 'User email address', unique: true, nullable: false })
  email: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Profile image URL of the user', nullable: true })
  profileImage: string;

  @IsString()
  @MinLength(6)
  @Column({ comment: 'User password for authentication', nullable: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Column({ comment: 'Preferred language of the user', nullable: true })
  language: string;

  @IsDateString()
  @IsOptional()
  @IsNotEmpty()
  @Column({ comment: 'Date of birth of the user', nullable: true })
  dob: string;

  @IsOptional()
  @IsEnum(Gender)
  @Column({ comment: 'Gender of the user', nullable: true })
  gender: Gender;

  @IsOptional()
  @IsEnum(Gender)
  @Column({
    comment: 'Martial status of the user (e.g., Single, Married)',
    nullable: true,
  })
  martialStatus: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Blood group of the user', nullable: true })
  bloodGroup: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Contact number of the user', nullable: true })
  contactNo: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Alternate contact number of the user', nullable: true })
  alterContactNO: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Family contact number of the user', nullable: true })
  familyContactNO: string;

  @IsString()
  @IsOptional()
  @Column({ comment: 'Facebook profile URL of the user', nullable: true })
  facebook: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Twitter profile URL of the user', nullable: true })
  twitter: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: 'First custom field for additional user data',
    nullable: true,
  })
  socialMedia1: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: 'Second custom field for additional user data',
    nullable: true,
  })
  socialMedia2: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: 'Custom field for any extra information about the user',
    nullable: true,
  })
  customField1: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: 'Another custom field for additional information',
    nullable: true,
  })
  customField2: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: 'Additional custom field for further user data',
    nullable: true,
  })
  customField3: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: 'Final custom field for extra data if needed',
    nullable: true,
  })
  customField4: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Guardian name for the user', nullable: true })
  guardianName: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: 'ID proof document name (e.g., Passport, ID card)',
    nullable: true,
  })
  idProofName1: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Second ID proof document name', nullable: true })
  idProofName2: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Permanent address of the user', nullable: true })
  permanentAddress: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Current address of the user', nullable: true })
  currentAddress: string;

  // Bank Details
  @IsOptional()
  @IsString()
  @Column({
    comment: "Account holder name for the user's bank account",
    nullable: true,
  })
  accountHolderName: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Bank account number of the user', nullable: true })
  accountNumber: string;

  @IsOptional()
  @IsString()
  @Column({ comment: "Bank name of the user's account", nullable: true })
  bankName: string;

  @IsOptional()
  @IsString()
  @Column({ comment: "Branch name of the user's bank account", nullable: true })
  branchName: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Taxpayer ID of the user', nullable: true })
  texPayerId: string;

  @IsOptional()
  @IsString()
  @Column({
    comment: "Bank Identifier Code (BIC) for the user's bank",
    nullable: true,
  })
  bankIdentifierCode: string;

  // Role with default value of "user"
  @IsOptional()
  @IsEnum(Role)
  @Column({
    default: Role.User,
    comment: 'Role of the user (e.g., admin, user, superadmin)',
    nullable: false,
  })
  roleName: Role;

  @IsOptional()
  @IsBoolean()
  @Column({ default: false, nullable: true })
  isVerified: boolean;
}
