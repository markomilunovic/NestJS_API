import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'models/todo.model';
import { TodoRepository } from '../repositories/todo.repository';
import { CreateTodoType, UpdateTodoType } from '../utils/types';
import { FileService } from './file.service';


@Injectable()
export class TodoService {
    constructor(
      private todoRepository: TodoRepository,
      private fileService: FileService
    ) {}

    async create(createTodoType: CreateTodoType, filePath: string): Promise<Todo> {
        const todo = await this.todoRepository.createTodo(createTodoType, filePath );
        return todo;
    };

    async getAll(page: number, size: number): Promise<Todo[]> {
        const todos = await this.todoRepository.getAllTodos(page, size);
        return todos;
    };

    async getById(id: string): Promise<Todo> {
        const todo = await this.todoRepository.getTodoById(id);
        if (!todo) {
          throw new NotFoundException('Todo not found');
        };
        return todo;
      };

    async update(id: string, updateTodoType: UpdateTodoType, filePath: string): Promise<Todo> {
        const todo = await this.todoRepository.updateTodo(id, updateTodoType, filePath);
        if (!todo) {
          throw new NotFoundException('Todo not found');
        };
        return todo;
      };

    async delete(id: string): Promise<boolean> {
        const todo = await this.todoRepository.getTodoById(id);

        if (!todo) {
            throw new NotFoundException('Todo not found');
          };

        const result = await this.todoRepository.deleteTodo(id);
        if (result) {
          try {
              await this.fileService.deleteFile(todo.imagePath);
          } catch (err) {
              console.error('Error deleting file:', err);
          };
          return true;
      };
        
        return false;
    };
};
