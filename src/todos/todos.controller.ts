// todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todos.service'; // Import interface Todo

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getTodos(
    @Query('userId') userId: string,
  ): Promise<Todo[] | { status: string; message: string }> {
    if (!userId) {
      return { status: 'error', message: 'User ID is required' };
    }
    return this.todosService.getTodos(userId);
  }

  @Post()
  async addTodo(@Body('title') title: string, @Body('userId') userId: string) {
    if (!title || !userId) {
      return { status: 'error', message: 'Title and User ID are required' };
    }
    await this.todosService.addTodo(title, userId);
    return { message: 'Todo added successfully' };
  }

  @Put(':id')
  async markDone(@Param('id') id: string) {
    if (!id) {
      return { status: 'error', message: 'Todo ID is required' };
    }
    await this.todosService.markDone(id);
    return { message: 'Todo marked as done' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!id) {
      return { status: 'error', message: 'Todo ID is required' };
    }
    await this.todosService.delete(id);
    return { message: 'Todo deleted successfully' };
  }
}
