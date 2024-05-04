import { Todo } from "models/todo.model";
import { CreateTodoDto } from "../dtos/createTodo.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateTodoDto } from "../dtos/updateTodo.dto";

@Injectable()
export class TodoRepository{

    async createTodo(createTodoDto: CreateTodoDto, filePath: string): Promise<Todo> {
        const todo = await Todo.create({ ...createTodoDto, imagePath: filePath });
        return todo;
    };

    async getAllTodos(page: number, size: number): Promise<Todo[]> {
        const todos = await Todo.findAll({
            offset: page * size,
            limit: size
        });
        return todos;
    };

    async getTodoById(id: string): Promise<Todo> {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    };

    async updateTodo(id: string, updateTodoDto: UpdateTodoDto, filePath: string): Promise<Todo> {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        const updatedTodo = await todo.update({ ...updateTodoDto, imagePath: filePath });
        return updatedTodo;
    };

    async deleteTodo(id: string): Promise<boolean> {
        const result = await Todo.destroy({
            where: { id }
        });
        if (result === 0) {
            return false;
        };
        return true;
    };

};