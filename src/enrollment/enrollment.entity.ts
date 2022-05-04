import { IsInt, Max, Min } from 'class-validator';
import { Student } from 'src/app.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @ManyToOne(() => Student, (student) => student.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  @IsInt()
  student: Student;

  @Column({
    type: 'integer',
    nullable: false,
  })
  @IsInt()
  @Min(1)
  amount: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  @IsInt()
  @Min(2)
  installments: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  @IsInt()
  @Min(1)
  @Max(31)
  due_day: number;
}
