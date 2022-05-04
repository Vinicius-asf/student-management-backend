import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateEnrollmentRequest } from 'src/enrollment/dto/enrollment/createEnrollment.dto';
import { ListAllEnrollmentsPaginatedRequest } from 'src/enrollment/dto/enrollment/listAllEnrollmentsPaginated.dto';
import { EnrollmentService } from 'src/enrollment/services/enrollment/enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Get()
  public async find(
    @Body()
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

  @Post()
  public async create(
    @Body()
    enrollment: CreateEnrollmentRequest,
  ) {
    try {
      return this.enrollmentService.create(enrollment);
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
