import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget-dto';
import { NotFoundError } from 'rxjs';
import { BudgetsRepository } from './budget.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from './budget.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BudgetService {

    constructor(
        @InjectRepository(Budget)
        private budgetRepository: BudgetsRepository
    ) {}

    async getAllBudget(user: User): Promise<Budget[]>{
        return await this.budgetRepository.find({where:{user}});
    }

    async getBudgetById(id: string, user: User): Promise<Budget>{
        const found = await this.budgetRepository.findOne({
        where: { id, user },
        relations: {
            expenses: true,
        }
    }
        );
        if (!found) {
            throw new NotFoundException(`Budget with id "${id}" not found`)
        } 
        return found;
    }

    async createBudget(createBudgetDto: CreateBudgetDto, user: User): Promise<Budget> {
        const {budgetName, budgetAmount, budgetColor, createdAt} = createBudgetDto;
        const budget = this.budgetRepository.create({
            budgetAmount,
            budgetName,
            budgetColor,
            createdAt,
            user
        })
        await this.budgetRepository.save(budget);
        return budget
    }

    async deleteBudget(id: string, user: User): Promise<void> {
        const result = await this.budgetRepository.delete({id, user})
        if(result.affected === 0) {
            throw new NotFoundException(`Budget with id "${id}" not found`)
        }
    }

}
