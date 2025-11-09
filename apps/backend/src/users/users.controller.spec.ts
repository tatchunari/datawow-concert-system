import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        { id: 1, username: 'John', email: 'john@example.com', role: 'user' },
        { id: 2, username: 'Jane', email: 'jane@example.com', role: 'admin' },
      ];
      mockUsersService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAll();
      expect(result).toBe(mockUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const dto: CreateUserDto = {
        username: 'John',
        email: 'john@example.com',
        role: 'user',
      };
      const mockUser = { id: 1, ...dto };

      mockUsersService.create.mockResolvedValue(mockUser);

      const result = await controller.create(dto);
      expect(result).toBe(mockUser);
      expect(mockUsersService.create).toHaveBeenCalledWith(
        dto.username,
        dto.email,
        dto.role,
      );
    });
  });
});
