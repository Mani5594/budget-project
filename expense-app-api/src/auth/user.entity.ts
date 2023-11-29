import { Budget } from "src/budget/budget.entity";
import { Expense } from "src/expense/expense.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        unique: true
    })
    userName: string;

    @Column()
    password: string;

    @OneToMany(type => Budget, budget => budget.user, {eager: false})
    budgets: Budget[]

    @OneToMany(type => Expense, expense => expense.user, {eager: false})
    expenses: Expense[]
}