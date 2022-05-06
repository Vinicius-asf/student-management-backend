import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/student (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/student').send({
      page: 1,
      count: 10,
    });
    return response.statusCode === HttpStatus.OK;
  });

  it('/student (GET) without pagination', async () => {
    const response = await request(app.getHttpServer()).get('/student');
    return response.statusCode === HttpStatus.BAD_REQUEST;
  });

  it('/student (GET) with wrong pagination', async () => {
    const response = await request(app.getHttpServer()).get('/student').send({
      page: 0,
      count: 0,
    });
    return response.statusCode === HttpStatus.BAD_REQUEST;
  });

  it('/enrollment (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/enrollment')
      .send({
        page: 1,
        count: 10,
      });
    return response.statusCode === HttpStatus.OK;
  });

  it('/enrollment (GET) without pagination', async () => {
    const response = await request(app.getHttpServer()).get('/enrollment');
    return response.statusCode === HttpStatus.BAD_REQUEST;
  });

  it('/enrollment (GET) with wrong pagination', async () => {
    const response = await request(app.getHttpServer())
      .get('/enrollment')
      .send({
        page: 0,
        count: 0,
      });
    return response.statusCode === HttpStatus.BAD_REQUEST;
  });
});
