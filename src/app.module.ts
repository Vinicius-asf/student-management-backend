import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { BillModule } from './bill/bill.module';
import { AuthModule } from './auth/auth.module';
import entities from './app.entities';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    EnrollmentModule,
    BillModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
