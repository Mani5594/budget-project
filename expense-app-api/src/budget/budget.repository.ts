import { Repository } from "typeorm";
import { Budget } from "./budget.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BudgetsRepository extends Repository<Budget> {
    // async createBudget(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    //     const {budgetName, budgetAmount, budgetColor} = createBudgetDto;
    //     const budget = await this.create({
    //         budgetAmount,
    //         budgetName,
    //         budgetColor
    //     })
    //     await this.save(budget);
    //     return budget;
    // }
}
