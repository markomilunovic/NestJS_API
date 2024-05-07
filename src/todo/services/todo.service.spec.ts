import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from '../repositories/todo.repository';
import { Todo } from 'models/todo.model';
import { CreateTodoType, UpdateTodoType } from 'todo/utils/types';
import { FileService } from './file.service';

jest.mock('../repositories/todo.repository');
jest.mock('./file.service'); 


describe('TodoService', () => {
  let service: TodoService;
  let todoRepository: jest.Mocked<TodoRepository>;
  let fileService: jest.Mocked<FileService>;

 beforeEach(async () => {
  jest.clearAllMocks(); // Clears usage data between tests to avoid leaks
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TodoService,
      FileService,
      {
        provide: TodoRepository,
        useValue: {
          createTodo: jest.fn(),
          getAllTodos: jest.fn(),
          getTodoById: jest.fn(),
          updateTodo: jest.fn(),
          deleteTodo: jest.fn()
        }
      }
    ],
  }).compile();

    service = module.get<TodoService>(TodoService);
    todoRepository = module.get(TodoRepository);
    fileService = module.get(FileService);
    fileService.deleteFile.mockResolvedValue();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo item', async () => {
      const newTodo: Partial<Todo> = {
        id: 1,
        title: 'Test Todo',
        description: 'This is a test todo item',
        imagePath: 'path/to/newImage.jpg',
        status: 'pending'
      };
      const imagePath = 'path/to/newImage.jpg';
      todoRepository.createTodo.mockResolvedValue(newTodo as Todo);

      const result = await service.create(newTodo as CreateTodoType, imagePath);

      expect(result).toHaveProperty('id');
      expect(result.title).toEqual(newTodo.title);
      expect(result.description).toEqual(newTodo.description);
      expect(result.imagePath).toEqual(imagePath);
      expect(result.status).toEqual('pending');
    });
  });

  describe('getAll', () => {
    it('should return all todo items', async () => {
      const mockTodos: Partial<Todo>[] = [
        { id: 1, title: 'Todo 1', description: 'Description 1', status: 'pending', imagePath: 'default/path' },
        { id: 2, title: 'Todo 2', description: 'Description 2', status: 'completed', imagePath: 'default/path' }
      ];

      const page = 1;
      const size = 10;
      todoRepository.getAllTodos.mockResolvedValue(mockTodos as Todo[]);

      const result = await service.getAll(page, size);

      expect(result).toEqual(mockTodos);
    });
  });

  describe('getById', () => {
    it('should return a todo item by its ID', async () => {
      const todoId = '1';
      const expectedTodo: Partial<Todo> = { 
        id: 1, 
        title: 'Test Todo', 
        description: 'This is a test todo item', 
        status: 'pending' 
      };

      todoRepository.getTodoById.mockResolvedValue(expectedTodo as Todo);

      const result = await service.getById(todoId);

      expect(result).toEqual(expectedTodo);
    });

    it('should throw NotFoundException when no todo item is found', async () => {
      const nonExistentTodoId = '999';
      todoRepository.getTodoById.mockResolvedValue(null);

      await expect(service.getById(nonExistentTodoId)).rejects.toThrow('Todo not found');
    });
  });

  describe('update', () => {
    it('should update a todo item', async () => {
      const todoId = '123'; 
      const updatedTodo = {
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'completed',
        imagePath: 'path/to/newImage.jpg'
      };
      const imagePath = 'path/to/newImage.jpg';
      todoRepository.updateTodo.mockResolvedValue(updatedTodo as Todo);

      const result = await service.update(todoId, updatedTodo as UpdateTodoType, imagePath);

      expect(result.title).toEqual(updatedTodo.title);
      expect(result.description).toEqual(updatedTodo.description);
      expect(result.imagePath).toEqual(imagePath);
      expect(result.status).toEqual('completed');
    });

    it('should throw NotFoundException when no todo item is found', async () => {
      const nonExistentTodoId = '999';
      const updatedTodo = {
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'completed'
      };
      const imagePath = 'path/to/newImage.jpg';
      todoRepository.getTodoById.mockResolvedValue(null);

      await expect(service.update(nonExistentTodoId, updatedTodo as UpdateTodoType, imagePath)).rejects.toThrow('Todo not found');
    });
  });

  describe('delete', () => {
    it('should delete a todo item', async () => {
      const todoId = '123';
      const imagePath = 'path/to/existingImage.jpg';

      todoRepository.getTodoById.mockResolvedValue({
        id: 123,
        title: 'Existing Todo',
        imagePath: imagePath,
        status: 'pending'
    } as Todo);

      todoRepository.deleteTodo.mockResolvedValue(true);

      const result = await service.delete(todoId);
      expect(result).toBe(true);
      expect(fileService.deleteFile).toHaveBeenCalledWith(imagePath);

    });
    it('should throw NotFoundException when no todo item is found', async () => {
      const nonExistentTodoId = '999';
      todoRepository.getTodoById.mockResolvedValue(null);

      await expect(service.delete(nonExistentTodoId)).rejects.toThrow('Todo not found');
    });
  });
});
