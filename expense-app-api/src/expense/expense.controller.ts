import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('expenses')
@UseGuards(AuthGuard())
export class ExpenseController {
    constructor(private expenseService: ExpenseService) {}

    @Get()
    getAllExpense( @GetUser() user: User ): Promise<Expense[]>{
        return this.expenseService.getAllExpense(user);
    }

    @Get('/:id')
    getExpenseById( @Param('id') id: string, @GetUser() user: User ): Promise<Expense>{
        return this.expenseService.getExpenseById(id, user);
    }

    @Post()
    createExpense( @Body() createExpensetDto: CreateExpenseDto, @GetUser() user: User ): Promise<Expense>{
        return this.expenseService.createExpense(createExpensetDto, user)
    }

    @Delete('/:id')
    deleteExpense(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.expenseService.deleteExpense(id, user)
    }
}
