import { Injectable } from '@nestjs/common';
import { Todo } from 'models/todo.model';
import { TodoRepository } from '../repositories/todo.repository';
import * as fs from 'fs';
import { promisify } from 'util';
import { CreateTodoType, UpdateTodoType } from '../utils/types';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class TodoService {
    constructor(private todoRepository: TodoRepository) {}

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

        return todo;
    };

    async update(id: string, updateTodoType: UpdateTodoType, filePath: string): Promise<Todo> {
        const todo = await this.todoRepository.updateTodo(id, updateTodoType, filePath);

        return todo;
    };

    async delete(id: string): Promise<boolean> {
        const todo = await this.todoRepository.getTodoById(id);
        if (todo) {
            const result = await this.todoRepository.deleteTodo(id);
            if (result) {
                await unlinkAsync(todo.imagePath).catch(err => console.error('Error deleting file:', err));
                return true;
            }
        };
        return false;
    };
};
