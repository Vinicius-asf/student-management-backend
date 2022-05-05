import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/app.entities';
import { BillService } from 'src/bill/services/bill/bill.service';
import {
  CreateEnrollment,
  CreateEnrollmentRequest,
} from 'src/enrollment/dto/enrollment/createEnrollment.dto';
import {
  ListAllEnrollmentsPaginatedRequest,
  ListAllEnrollmentsPaginatedResponse,
} from 'src/enrollment/dto/enrollment/listAllEnrollmentsPaginated.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private billService: BillService,
  ) {}

  public async find(
    paginationOptions: ListAllEnrollmentsPaginatedRequest,
  ): Promise<ListAllEnrollmentsPaginatedResponse> {
    const queryResponse = await this.enrollmentRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.count,
      take: paginationOptions.count,
    });
    const response: Enrollment[] = await this.formatBillDueDate(queryResponse);
    return {
      page: paginationOptions.page,
      items: response,
    };
  }

  private async formatBillDueDate(
    enrollments: Enrollment[],
  ): Promise<Enrollment[]> {
    const newEnrollments = enrollments.map((enrollment) => {
      enrollment.bills = enrollment.bills.map((bill) => {
        bill.due_date = new Date(bill.due_date).toLocaleString('pt-BR', {
          dateStyle: 'short',
        });
        console.log(bill.due_date);
        return bill;
      });
      return enrollment;
    });
    return newEnrollments;
  }

  public async create(
    enrollment: CreateEnrollmentRequest,
  ): Promise<CreateEnrollment> {
    const newEntity = this.enrollmentRepository.create(enrollment);
    const response = await this.enrollmentRepository.save(newEntity);
    await this.createBill(response);
    return {
      id: response.id,
    };
  }

  private async createBill(enrollment: Enrollment): Promise<void> {
    let remaining_amount = enrollment.amount;
    const installments_amount = Math.floor(
      enrollment.amount / enrollment.installments,
    );
    const due_date = new Date();
    due_date.setDate(enrollment.due_day);
    if (due_date < new Date()) {
      due_date.setMonth(due_date.getMonth() + 1);
    }
    for (
      let installment = 0;
      installment < enrollment.installments;
      installment++
    ) {
      const bill = {
        enrollment_id: enrollment.id,
        amount: Math.min(remaining_amount, installments_amount),
        due_date: due_date,
      };
      await this.billService.create(bill);
      remaining_amount -= installments_amount;
      due_date.setMonth(due_date.getMonth() + 1);
    }
  }
}
