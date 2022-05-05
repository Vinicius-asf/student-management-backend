import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bill, Enrollment } from '../../../app.entities';
import { BillService } from '../../../bill/services/bill/bill.service';
import { mockRepository } from '../../../mock/mockRepository/mockRepository.mock';
import { EnrollmentService } from '../../services/enrollment/enrollment.service';
import { EnrollmentController } from './enrollment.controller';

describe('EnrollmentController', () => {
  let controller: EnrollmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentController],
      providers: [
        EnrollmentService,
        {
          provide: getRepositoryToken(Enrollment),
          useValue: mockRepository,
        },
        BillService,
        {
          provide: getRepositoryToken(Bill),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<EnrollmentController>(EnrollmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
