/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type PaymentMethodsType = "credit_card" | "boleto";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
		nullable:false
	})
  name: string;

  @Column({
		length:11,
		unique:true,
	})
  cpf: string;

  @Column({
		nullable:true
	})
  birthdate: Date;

	@Column({
		type:"enum",
		enum:["credit_card","boleto"],
	})
  payment_method: PaymentMethodsType
}