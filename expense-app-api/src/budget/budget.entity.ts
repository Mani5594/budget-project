import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Expense } from "src/expense/expense.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Budget {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    budgetName: string

    @Column()
    budgetAmount: number

    @Column()
    budgetColor: string

    @Column({ type: 'bigint' })
    createdAt: number;

    @OneToMany(() => Expense, (expense) => expense.budget, { cascade: true, onDelete: 'CASCADE' })
    expenses: Expense[]

    @ManyToOne(() => User, user => user.budgets, {eager: false})
    @Exclude( { toPlainOnly: true } )
    user: User
}