import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentMethodsType {
  'credit_card',
  'boleto',
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column({
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    length: 14,
    unique: true,
  })
  cpf: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  birthdate: string;

  @Column({
    type: 'enum',
    enum: ['credit_card', 'boleto'],
  })
  @IsEnum(PaymentMethodsType)
  payment_method: PaymentMethodsType;
}
