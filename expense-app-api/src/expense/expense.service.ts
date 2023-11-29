import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from './expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseRepository } from './expense.repository';
import { CreateExpenseDto } from './dto/create-expense-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private expenseRepository: ExpenseRepository
    ) {}

    async getAllExpense(user: User): Promise<Expense[]>{
        return await this.expenseRepository.find({where:{user}});
    }

    async getExpenseById(id: string, user: User): Promise<Expense>{
        const found = await this.expenseRepository.findOne({where: {id, user}})
        if (!found) {
            throw new NotFoundException(`Expense with id "${id}" not found`)
        } 
        return found;
    }

    async createExpense(createExpenseDto: CreateExpenseDto, user: User): Promise<Expense> {
        const {expenseName, expenseAmount, budgetId, createdAt} = createExpenseDto;
        const expense = this.expenseRepository.create({
            expenseName,
            expenseAmount,
            budgetId,
            createdAt,
            user
        })
        await this.expenseRepository.save(expense);
        return expense
    }

    async deleteExpense(id: string, user: User): Promise<void> {
        const result = await this.expenseRepository.delete({id, user})
        if(result.affected === 0) {
            throw new NotFoundException(`Expesnse with id "${id}" not found`)
        }
    }
}
