import { IsDate, IsEnum, IsInt, Min } from 'class-validator';
import { Enrollment } from 'src/app.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum StatusType {
  'open',
  'pending',
  'paid',
}

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'enrollment_id' })
  @IsInt()
  enrollment: Enrollment;

  @Column({
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  amount: number;

  @Column({
    type: 'date',
  })
  @IsDate()
  due_date: Date;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: 'open',
  })
  @IsEnum(StatusType)
  status: StatusType;
}
