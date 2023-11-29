import { IsNotEmpty } from "class-validator";

export class CreateExpenseDto {

    @IsNotEmpty()
    expenseName: string;

    @IsNotEmpty()
    expenseAmount: number;
    
    @IsNotEmpty()
    budgetId: string;

    createdAt: number;

}