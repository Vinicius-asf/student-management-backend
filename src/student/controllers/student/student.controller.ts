import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { StudentService } from 'src/student/services/student/student.service';
import {
  ListAllEntitiesPaginated,
  listAllStudentsRequest,
} from 'src/student/dto/student/listAllEntitiesPaginated.dto';
import { CreateStudent } from 'src/student/dto/student/createStudent.dto';
import { PaymentMethodsType } from 'src/student/student.entity';
import { CPFValidationPipe } from 'src/student/pipes/student/cpfValidation/cpfValidation.pipe';
import { EmptyValueValidationPipe } from 'src/pipes/EmptyValueValidationPipe/emptyValueValidation.pipe';
import { BirthdateValidationPipe } from 'src/student/pipes/student/birthdateValidation/birthdateValidation.pipe';
import { PaymentMethodValidationPipe } from 'src/student/pipes/student/paymentMethodValidation/paymentMethodValidation.pipe';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  public async find(
    @Body()
    paginationOptions: listAllStudentsRequest,
  ): Promise<ListAllEntitiesPaginated> {
    return await this.studentService.find(
      paginationOptions.page,
      paginationOptions.count,
    );
  }

  @Post()
  public async create(
    @Body('name', EmptyValueValidationPipe) name: string,
    @Body('cpf', CPFValidationPipe) cpf: string,
    @Body('birthdate', BirthdateValidationPipe)
    birthdate: string | null | undefined,
    @Body('payment_method', PaymentMethodValidationPipe)
    payment_method: PaymentMethodsType,
  ): Promise<CreateStudent> {
    try {
      return await this.studentService.create(
        name,
        cpf,
        birthdate,
        payment_method,
      );
    } catch (error) {
      if (error && error.detail && error.table) {
        throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
