import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { ProfileModule } from './profile/profile.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [AuthModule, TodosModule, ProfileModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
