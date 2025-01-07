import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp')
export class otpCodeSchema {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  otp: string;
}
