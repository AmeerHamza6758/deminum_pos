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
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessRegisterSchema } from './bussiness.model';

@Entity('user_register')
export class UserRegisterSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Column({
    nullable: true,
  })
  prefix: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  fname: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  lname: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: true })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, nullable: false })
  email: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, default: '' })
  profileImage: string;

  @IsString()
  @MinLength(6)
  @Column({ nullable: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Column({ nullable: true })
  language: string;

  @IsOptional()
  @Column({ nullable: true })
  dob: string;

  @IsOptional()
  @IsEnum(Gender)
  @Column({ nullable: true })
  gender: Gender;

  @IsOptional()
  @IsEnum(Gender)
  @Column({
    nullable: true,
  })
  martialStatus: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  bloodGroup: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  contactNo: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  alterContactNO: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  familyContactNO: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  facebook: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  twitter: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  socialMedia1: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  socialMedia2: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  customField1: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  customField2: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  customField3: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  customField4: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  guardianName: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  idProofName1: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  idProofName2: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  permanentAddress: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  currentAddress: string;

  // Bank Details
  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  accountHolderName: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  accountNumber: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  bankName: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  branchName: string;

  @IsOptional()
  @IsString()
  @Column({ comment: 'Taxpayer ID of the user', nullable: true })
  texPayerId: string;

  @IsOptional()
  @IsString()
  @Column({
    nullable: true,
  })
  bankIdentifierCode: string;

  @IsOptional()
  // @IsEnum(Role)
  @Column({
    default: 'user',
    nullable: true,
  })
  roleName: string;

  // social login
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  uid: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  provider: string;

  @IsString()
  @Column({ nullable: true })
  stripeCustomerId: string;

  @IsOptional()
  @IsBoolean()
  @Column({ default: false, nullable: true })
  isVerified: boolean;

  // Relations
  @OneToMany(() => BusinessRegisterSchema, (business) => business.user)
  businesses: BusinessRegisterSchema[];
}
