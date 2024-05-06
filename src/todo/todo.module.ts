import { Module, NestModule } from '@nestjs/common';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TodoRepository } from './repositories/todo.repository';
import { FileService } from './services/file.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, FileService],
})

export class TodoModule {}


