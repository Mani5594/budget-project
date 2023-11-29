import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { ExpenseRepository } from './expense.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    AuthModule
],
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseRepository]
})
export class ExpenseModule {}
