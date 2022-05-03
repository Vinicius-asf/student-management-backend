import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from 'src/student/services/student/student.service';
import { ListAllEntitiesPaginated } from 'src/student/dto/student/listAllEntitiesPaginated.dto';
import { CreateStudent } from 'src/student/dto/student/createStudent.dto';
import { PaymentMethodsType } from 'src/student/student.entity';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  public async find(
    @Param('page') page: number,
    @Param('count') count: number,
  ): Promise<ListAllEntitiesPaginated> {
    return this.studentService.find(page, count);
  }

  @Post()
  public async create(
    @Body('name') name: string,
    @Body('cpf') cpf: string,
    @Body('birthdate') birthdate: string,
    @Body('payment_method') payment_method: PaymentMethodsType,
  ): Promise<CreateStudent> {
    return this.studentService.create(name, cpf, birthdate, payment_method);
  }
}
