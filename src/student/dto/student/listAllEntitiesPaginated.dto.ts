import { Type } from 'class-transformer';
import { IsArray, IsInt, Min } from 'class-validator';
import { Student } from 'src/app.entities';

export class listAllStudentsRequest {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  count: number;
}
export class ListAllEntitiesPaginated {
  @IsInt()
  @Min(1)
  page: number;

  @IsArray()
  @Type(() => Student)
  items: Student[];
}
