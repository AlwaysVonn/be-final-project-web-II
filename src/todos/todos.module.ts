// todos.module.ts
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [],
  controllers: [TodosController], // Pastikan sudah terdaftar di sini
  providers: [TodosService],
})
export class TodosModule {}
