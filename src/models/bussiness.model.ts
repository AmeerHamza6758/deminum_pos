import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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
import { UserRegisterSchema } from './user.model';

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

  @ManyToOne(() => UserRegisterSchema, (user) => user.businesses, { cascade: true })
  @JoinColumn({ name: 'userId' }) 
  user: UserRegisterSchema;

  @Column({ nullable: false })
  userId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
