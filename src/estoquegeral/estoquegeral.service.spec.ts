import { Test, TestingModule } from '@nestjs/testing';
import { EstoquegeralService } from './estoquegeral.service';

describe('EstoquegeralService', () => {
  let service: EstoquegeralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstoquegeralService],
    }).compile();

    service = module.get<EstoquegeralService>(EstoquegeralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
