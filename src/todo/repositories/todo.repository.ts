import { Injectable } from "@nestjs/common";
import { CreateTodoType, UpdateTodoType } from "todo/utils/types";
import { Todo } from "../../models/todo.model";

@Injectable()
export class TodoRepository{

    async createTodo(createTodoType: CreateTodoType, filePath: string): Promise<Todo> {
        const todo = await Todo.create({ ...createTodoType, imagePath: filePath });
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
    
        return todo;
    };

    async updateTodo(id: string, updateTodoType: UpdateTodoType, filePath: string): Promise<Todo> {
        const todo = await Todo.findByPk(id);
        
        const updatedTodo = await todo.update({ ...updateTodoType, imagePath: filePath });

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