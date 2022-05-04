import { Module } from '@nestjs/common';
import { BillService } from './services/bill/bill.service';

@Module({
  providers: [BillService],
})
export class BillModule {}
