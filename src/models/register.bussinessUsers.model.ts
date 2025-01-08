import { Column, PrimaryGeneratedColumn } from "typeorm";

export class bussinessUserSchema{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    prefix:string;
    
    @Column()
    fname:string;
    
    @Column()
    lname:string;
    
    @Column()
    email:string;
    
    @Column()
    password:string;
    
}