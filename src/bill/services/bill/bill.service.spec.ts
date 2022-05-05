import { Test, TestingModule } from '@nestjs/testing';
import { BillService } from './bill.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bill } from '../../bill.entity';
import { mockRepository } from '../../../mock/mockRepository/mockRepository.mock';

describe('BillService', () => {
  let service: BillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillService,
        {
          provide: getRepositoryToken(Bill),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BillService>(BillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
