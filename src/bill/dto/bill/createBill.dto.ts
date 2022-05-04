import { IsDate, IsEnum, IsInt, Min } from 'class-validator';
import { StatusType } from 'src/bill/bill.entity';

export class CreateBill {
  @IsInt()
  @Min(1)
  enrollment_id: number;

  @IsInt()
  @Min(1)
  amount: number;

  @IsDate()
  due_date: Date;

  @IsEnum(StatusType)
  status: StatusType;
}
