import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student/student.controller';
import { StudentService } from './services/student/student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
