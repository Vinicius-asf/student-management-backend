import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CPFValidationPipe implements PipeTransform {
  transform(value: string) {
    if (value.length > 15 || value.length < 11) {
      throw new BadRequestException('cpf must have length between 11 and 15');
    } else {
      let cpf = value.trim();

      cpf = cpf.replace(/\./g, '');
      cpf = cpf.replace('-', '');
      const cpfArray = cpf.split('');

      let v1 = 0;
      let v2 = 0;
      let aux = false;

      for (let i = 1; cpfArray.length > i; i++) {
        if (cpfArray[i - 1] != cpfArray[i]) {
          aux = true;
        }
      }

      if (aux == false) {
        throw new BadRequestException('cpf in invalid');
      }

      for (let i = 0, p = 10; cpfArray.length - 2 > i; i++, p--) {
        v1 += parseInt(cpfArray[i]) * p;
      }

      v1 = (v1 * 10) % 11;

      if (v1 == 10) {
        v1 = 0;
      }

      if (v1 != parseInt(cpfArray[9])) {
        throw new BadRequestException('cpf in invalid');
      }

      for (let i = 0, p = 11; cpfArray.length - 1 > i; i++, p--) {
        v2 += parseInt(cpfArray[i]) * p;
      }

      v2 = (v2 * 10) % 11;

      if (v2 == 10) {
        v2 = 0;
      }

      if (v2 != parseInt(cpfArray[10])) {
        throw new BadRequestException('cpf in invalid');
      } else {
        return (
          cpf.slice(0, 3) +
          '.' +
          cpf.slice(3, 6) +
          '.' +
          cpf.slice(6, 9) +
          '-' +
          cpf.slice(9, 11)
        );
      }
    }
  }
}
