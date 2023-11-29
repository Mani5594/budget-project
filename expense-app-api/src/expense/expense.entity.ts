import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Budget } from "src/budget/budget.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    expenseName: string

    @Column()
    expenseAmount: number

    @Column()
    budgetId: string

    @Column({ type: 'bigint' })
    createdAt: number;

    @ManyToOne(() => Budget, (budget) => budget.expenses, { onDelete: 'CASCADE' })
    budget: Budget

    @ManyToOne(() => User, user => user.expenses, {eager: false})
    @Exclude( { toPlainOnly: true } )
    user: User
}