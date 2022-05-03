import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class EmptyValueValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== null) {
      return value;
    }
    throw new BadRequestException('value must be different than null');
  }
}
