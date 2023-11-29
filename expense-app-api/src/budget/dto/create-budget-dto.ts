import { IsNotEmpty } from "class-validator";

export class CreateBudgetDto {

    @IsNotEmpty()
    budgetName: string;

    @IsNotEmpty()
    budgetAmount: number;
    
    @IsNotEmpty()
    budgetColor: string;

    createdAt: number;
}