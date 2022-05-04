import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/bill/bill.entity';
import { CreateBill } from 'src/bill/dto/bill/createBill.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  public async create(bill: CreateBill) {
    const newBillEntity = this.billRepository.create(bill);
    const response = await this.billRepository.save(newBillEntity);
    return response;
  }
}
