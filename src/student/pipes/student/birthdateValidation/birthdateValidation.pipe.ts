import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class BirthdateValidationPipe implements PipeTransform {
  transform(value: null | string, metadata: ArgumentMetadata) {
    if (value === null || value === '' || value === undefined) {
      return value;
    } else {
      const dateArray = value.split('/');
      const dateString = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
      const checkDate = new Date(dateString);
      if (checkDate instanceof Date && !isNaN(checkDate.valueOf())) {
        return value;
      }
      throw new BadRequestException('invalid date');
    }
  }
}
