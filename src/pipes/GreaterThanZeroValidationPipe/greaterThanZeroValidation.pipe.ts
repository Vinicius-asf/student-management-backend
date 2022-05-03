import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class GreaterThanZeroValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value > 1) {
      return value;
    }
    throw new BadRequestException('value must be greater than zero');
  }
}
