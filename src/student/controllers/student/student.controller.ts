import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from 'src/student/services/student/student.service';
import { ListAllEntitiesPaginated } from 'src/student/dto/student/listAllEntitiesPaginated.dto';
import { CreateStudent } from 'src/student/dto/student/createStudent.dto';
import { PaymentMethodsType } from 'src/student/student.entity';
import { CPFValidationPipe } from 'src/pipes/cpfValidation/cpfValidation.pipe';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  public async find(
    @Body('page') page: number,
    @Body('count') count: number,
  ): Promise<ListAllEntitiesPaginated> {
    return await this.studentService.find(page, count);
  }

  @Post()
  public async create(
    @Body('name') name: string,
    @Body('cpf', CPFValidationPipe) cpf: string,
    @Body('birthdate') birthdate: string,
    @Body('payment_method') payment_method: PaymentMethodsType,
  ): Promise<CreateStudent> {
    return await this.studentService.create(
      name,
      cpf,
      birthdate,
      payment_method,
    );
  }
}
