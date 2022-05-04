import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillModule } from 'src/bill/bill.module';
import { EnrollmentController } from './controllers/enrollment/enrollment.controller';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './services/enrollment/enrollment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment]), BillModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
