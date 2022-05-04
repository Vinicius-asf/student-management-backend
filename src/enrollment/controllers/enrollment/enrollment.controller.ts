import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ListAllEnrollmentsPaginatedRequest } from 'src/enrollment/dto/enrollment/listAllEnrollmentsPaginated.dto';
import { EnrollmentService } from 'src/enrollment/services/enrollment/enrollment.service';
import { ValidationPipe } from 'src/pipes/ValidationPipe/validation.pipe';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Get()
  public async find(
    @Body(new ValidationPipe())
    paginationOptions: ListAllEnrollmentsPaginatedRequest,
  ) {
    try {
      return this.enrollmentService.find(paginationOptions);
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
