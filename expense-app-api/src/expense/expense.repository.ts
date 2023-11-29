import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Expense } from "./expense.entity";


@Injectable()
export class ExpenseRepository extends Repository<Expense> {
}
