import { Type } from 'class-transformer';
import { IsArray, IsInt, Min } from 'class-validator';
import { Enrollment } from 'src/app.entities';

export class ListAllEnrollmentsPaginatedRequest {
  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  count: number;
}

export class ListAllEnrollmentsPaginatedResponse {
  @IsInt()
  @Min(1)
  page: number;

  @IsArray()
  @Type(() => Enrollment)
  items: Enrollment[];
}
