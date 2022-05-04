import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentMethodsType {
  'credit_card',
  'boleto',
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
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
  payment_method: PaymentMethodsType;
}
