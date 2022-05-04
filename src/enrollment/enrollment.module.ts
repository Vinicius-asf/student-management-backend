import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from './controllers/enrollment/enrollment.controller';
import { Enrollment } from './enrollment.entity';
import { EnrollmentService } from './services/enrollment/enrollment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
