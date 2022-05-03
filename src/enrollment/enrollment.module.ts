import { Module } from '@nestjs/common';
import { EnrollmentController } from './controllers/enrollment/enrollment.controller';
import { EnrollmentService } from './services/enrollment/enrollment.service';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
