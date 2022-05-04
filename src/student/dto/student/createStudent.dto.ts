import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PaymentMethodsType } from 'src/student/student.entity';

export class CreateStudent {
  id: number;
}

export class CreateStudentRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @IsEnum(PaymentMethodsType)
  payment_method: PaymentMethodsType;
}
