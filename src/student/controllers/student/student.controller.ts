import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from 'src/student/services/student/student.service';
import { ListAllEntitiesPaginated } from 'src/student/dto/student/listAllEntitiesPaginated.dto';
import { CreateStudent } from 'src/student/dto/student/createStudent.dto';
import { PaymentMethodsType } from 'src/student/student.entity';
import { CPFValidationPipe } from 'src/student/pipes/student/cpfValidation/cpfValidation.pipe';
import { GreaterThanZeroValidationPipe } from 'src/pipes/GreaterThanZeroValidationPipe/GreaterThanZeroValidation.pipe';
import { EmptyValueValidationPipe } from 'src/pipes/EmptyValueValidationPipe/emptyValueValidation.pipe';
import { BirthdateValidationPipe } from 'src/student/pipes/student/birthdateValidation/birthdateValidation.pipe';
import { PaymentMethodValidationPipe } from 'src/student/pipes/student/paymentMethodValidation/paymentMethodValidation.pipe';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  public async find(
    @Body('page', GreaterThanZeroValidationPipe) page: number,
    @Body('count', GreaterThanZeroValidationPipe) count: number,
  ): Promise<ListAllEntitiesPaginated> {
    return await this.studentService.find(page, count);
  }

  @Post()
  public async create(
    @Body('name', EmptyValueValidationPipe) name: string,
    @Body('cpf', CPFValidationPipe) cpf: string,
    @Body('birthdate', BirthdateValidationPipe) birthdate: string,
    @Body('payment_method', PaymentMethodValidationPipe)
    payment_method: PaymentMethodsType,
  ): Promise<CreateStudent> {
    return await this.studentService.create(
      name,
      cpf,
      birthdate,
      payment_method,
    );
  }
}
