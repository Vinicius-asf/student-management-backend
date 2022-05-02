import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from 'src/student/services/student/student.service';
import { ListAllEntitiesPaginated } from 'src/student/dto/student/listAllEntitiesPaginated.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  public async find(
    @Param('page') page: number,
    @Param('count') count: number,
  ): Promise<ListAllEntitiesPaginated> {
    return this.studentService.find(page, count);
  }
}
