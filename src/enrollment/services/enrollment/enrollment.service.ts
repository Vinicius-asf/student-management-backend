import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/app.entities';
import {
  ListAllEnrollmentsPaginatedRequest,
  ListAllEnrollmentsPaginatedResponse,
} from 'src/enrollment/dto/enrollment/listAllEnrollmentsPaginated.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  public async find(
    paginationOptions: ListAllEnrollmentsPaginatedRequest,
  ): Promise<ListAllEnrollmentsPaginatedResponse> {
    const queryResponse = await this.enrollmentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.count,
      take: paginationOptions.count,
    });
    return {
      page: paginationOptions.page,
      items: queryResponse,
    };
  }
}
