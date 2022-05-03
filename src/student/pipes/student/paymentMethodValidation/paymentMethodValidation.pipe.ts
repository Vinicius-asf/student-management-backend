import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class PaymentMethodValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === 'boleto' || value === 'credit_card') {
      return value;
    }
    throw new BadRequestException('value must be boleto or credit_card');
  }
}
