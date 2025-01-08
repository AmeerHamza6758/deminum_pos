import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsUrl,
  Matches,
  Length,
} from 'class-validator';

@Entity()
export class BusinessRegisterSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  bussinessName: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  logo: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  website: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @Matches(/^[0-9]+$/)
  @Length(10, 15)
  bussinessContactNumber: string;

  @Column({ nullable: true })
  @IsOptional()
  @Matches(/^[0-9]+$/)
  @Length(10, 15)
  alterContactNumber: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  country: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  state: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  zipCode: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  landMark: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  timeZone: string;
}
