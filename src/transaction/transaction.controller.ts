import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TransactionService, Transaction } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAll(@Query('userId') userId: string): Promise<Transaction[]> {
    return this.transactionService.getTransactions(userId);
  }

  @Post()
  async add(
    @Query('userId') userId: string,
    @Body() body: Omit<Transaction, 'id' | 'user_id' | 'created_at'>,
  ) {
    await this.transactionService.addTransaction(userId, body);
    return { message: 'Transaction added successfully' };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Transaction>) {
    await this.transactionService.updateTransaction(id, data);
    return { message: 'Transaction updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.transactionService.deleteTransaction(id);
    return { message: 'Transaction deleted successfully' };
  }
}
