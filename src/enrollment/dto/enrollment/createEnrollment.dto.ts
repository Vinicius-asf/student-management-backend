import { IsInt, Max, Min } from 'class-validator';

export class CreateEnrollment {
  @IsInt()
  id: number;
}

export class CreateEnrollmentRequest {
  @IsInt()
  @Min(1)
  amount: number;

  @IsInt()
  @Min(0)
  installments: number;

  @IsInt()
  @Min(1)
  @Max(31)
  due_day: number;

  @IsInt()
  @Min(1)
  student_id: number;
}
