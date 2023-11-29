import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget-dto';
import { Budget } from './budget.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('budgets')
@UseGuards(AuthGuard())
export class BudgetController {
    constructor(private budgetService: BudgetService) {}

    @Get()
    getAllBudget( @GetUser() user: User ): Promise<Budget[]>{
        return this.budgetService.getAllBudget(user);
    }

    @Get('/:id')
    getBudgetById( @Param('id') id: string, @GetUser() user: User): Promise<Budget>{
        return this.budgetService.getBudgetById(id, user);
    }

    @Post()
    createBudget( 
        @Body() createBudgetDto: CreateBudgetDto,
        @GetUser() user: User
        ): Promise<Budget>{
        return this.budgetService.createBudget(createBudgetDto, user)
    }

    @Delete('/:id')
    deleteBudget(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.budgetService.deleteBudget(id, user)
    }
}
