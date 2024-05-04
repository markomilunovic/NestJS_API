import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpStatus, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, HttpException, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from '../dtos/createTodo.dto';
import { TodoService } from '../services/todo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTodoDto } from '../dtos/updateTodo.dto';
import { diskStorage } from 'multer';
import { Todo } from 'models/todo.model';
import { JwtAuthGuard } from 'auth/guards/jwt.guard';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {

    constructor(private todoService: TodoService) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'images',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        })
    }))
    async createTodo(@UploadedFile() file: Express.Multer.File, @Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        try{
            const todo = await this.todoService.create(createTodoDto, file.path);
            return todo;
        } catch (error) {
            throw new HttpException('Error creating todo', HttpStatus.INTERNAL_SERVER_ERROR);
        };
       
    };
    

    @Get()
    async getAllTodos(@Query('page') page: string, @Query('size') size: string): Promise<Todo[]> {
        try {
            const pageAsNumber = parseInt(page, 10) || 0;
            const sizeAsNumber = parseInt(size, 10) || 10;
            const todos = await this.todoService.getAll(pageAsNumber, sizeAsNumber);
            return todos;
        } catch (error) {
            throw new HttpException('Error retrieving todo', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Get(':id')
    async getTodoById(@Param('id') id: string): Promise<Todo> {
        try {
            const todo = await this.todoService.getById(id);
            if (!todo) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            };
            return todo;
        } catch (error) {
            throw new HttpException('Error retrieving todo by id', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Put(':id')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'images',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`)
            }
        })
    }))
    async updateTodo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateTodoDto: UpdateTodoDto): Promise<object> {
        try {

            const updated = await this.todoService.update(id, updateTodoDto, file.path);
            if (!updated) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            };
            return { message: 'Todo updated successfully' };
        } catch (error) {
            throw new HttpException('Error updating todo', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Delete(':id')
    async deleteTodo(@Param('id') id: string): Promise<object> {
        try {

            const deleted = await this.todoService.delete(id);
            if (!deleted) {
                throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
            }
            else {
            return { message: 'Todo deleted successfully' };
            }
        }
        catch (error) {
            throw new HttpException('Error deleting todo', HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
};
