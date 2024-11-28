import { Test, TestingModule } from '@nestjs/testing';
import { EstoquegeralController } from './estoquegeral.controller';
import { EstoquegeralService } from './estoquegeral.service';

describe('EstoquegeralController', () => {
  let controller: EstoquegeralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstoquegeralController],
      providers: [EstoquegeralService],
    }).compile();

    controller = module.get<EstoquegeralController>(EstoquegeralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
