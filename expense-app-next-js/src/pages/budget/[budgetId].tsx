import AddExpenseForm from '@/components/AddExpenseForm';
import BudgetItem from '@/components/BudgetItem';
import Table from '@/components/Table';
import React from 'react'
import { Budget, Expense } from '../../../helper';
import { useRouter } from 'next/router';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const BudgetPage = () => {
    const router = useRouter()

    const budget = useSelector((state: RootState) => state.budget.budgets.filter((x: Budget) => x.id === router.query.budgetId))[0]
    const expenses = useSelector((state: RootState) => state.expense.expenses.filter((y: Expense) => y.budgetId === router.query.budgetId))

    return (
        <>
            {
                budget &&
                <div
                    className="grid-lg"
                    style={{
                        "--accent": budget.budgetColor,
                    } as any}
                >
                    <h1 className="h2">
                        <span className="accent">{budget.budgetName}</span> Overview
                    </h1>
                    <div className="flex-lg">
                        <BudgetItem budget={budget} showDelete={true} />
                        <AddExpenseForm budgets={[budget]} />
                    </div>
                    {expenses && expenses.length > 0 && (
                        <div className="grid-md">
                            <h2>
                                <span className="accent">{budget.budgetName}</span> Expenses
                            </h2>
                            <Table expenses={expenses} showBudget={false} />
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default BudgetPage