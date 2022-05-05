const createMock = jest.fn((dto: any) => {
  return dto;
});

const saveMock = jest.fn((dto: any) => {
  return dto;
});

const findMock = jest.fn((dto: any) => {
  return dto;
});

const MockRepository = jest.fn().mockImplementation(() => {
  return {
    create: createMock,
    save: saveMock,
    find: findMock,
  };
});
export const mockRepository = new MockRepository();
