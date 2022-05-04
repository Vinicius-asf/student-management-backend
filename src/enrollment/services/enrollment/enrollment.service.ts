import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/app.entities';
import {
  CreateEnrollment,
  CreateEnrollmentRequest,
} from 'src/enrollment/dto/enrollment/createEnrollment.dto';
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

  public async create(
    enrollment: CreateEnrollmentRequest,
  ): Promise<CreateEnrollment> {
    const newEntity = this.enrollmentRepository.create(enrollment);
    const response = await this.enrollmentRepository.save(newEntity);
    return {
      id: response.id,
    };
  }
}
