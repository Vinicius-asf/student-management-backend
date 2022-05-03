import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/app.entities';
import { Repository } from 'typeorm';
import { ListAllEntitiesPaginated } from 'src/student/dto/student/listAllEntitiesPaginated.dto';
import { CreateStudent } from 'src/student/dto/student/createStudent.dto';
import { PaymentMethodsType } from 'src/student/student.entity';
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
      items: response.map((student) => {
        student.birthdate
          ? (student.birthdate = new Date(student.birthdate).toLocaleString(
              'pt-BR',
              { dateStyle: 'short' },
            ))
          : null;
        return student;
      }),
    };
  }

  public async create(
    name: string,
    cpf: string,
    birthdate: string,
    payment_method: PaymentMethodsType,
  ): Promise<CreateStudent> {
    const newEntity = this.studentRepository.create({
      name: name,
      cpf: cpf,
      birthdate: birthdate,
      payment_method: payment_method,
    });
    const response = await this.studentRepository.save(newEntity);
    console.log(response);
    return {
      id: response.id,
    };
  }
}
