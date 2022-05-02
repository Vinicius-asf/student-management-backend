import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/app.entities';
import { Repository } from 'typeorm';
import { ListAllEntitiesPaginated } from 'src/student/dto/student/listAllEntitiesPaginated.dto';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  public async find(
    page: number,
    count: number,
  ): Promise<ListAllEntitiesPaginated> {
    const response: Student[] = await this.studentRepository.find({
      skip: (page - 1) * count,
      take: count,
    });
    return {
      page: page,
      items: response,
    };
  }
}
