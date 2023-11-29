import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/solid';
import {
    Budget,
    Expense,
    formatCurrency,
} from '../../helper';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '@/slices/expenseSlice'

interface ExpenseItemProps {
    expense: Expense
    showBudget: boolean;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, showBudget }) => {
    const [budget, setBudget] = useState<Budget | undefined>();

    const {budgets} = useSelector((state: RootState) => state.budget)
    const dispatch = useDispatch<AppDispatch>()

    const handleDeleteExpense = async () => {
        try {
            dispatch(deleteExpense(expense.id))
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const getAllMatchingBudget = (budgetId: string): Budget => {
        return budgets.filter((item: any) => item.id === budgetId)[0]
    }
    useEffect(() => {
        setBudget( getAllMatchingBudget(expense.budgetId) )
    }, [])

    return (
        <>
            <td>{expense.expenseName}</td>
            <td>{formatCurrency(expense.expenseAmount)}</td>
            <td>{(new Date(+expense.createdAt).toLocaleDateString())}</td>
            {showBudget && (
                <td>
                    {budget && (<Link href={`/budget/${budget.id}`} style={{ "--accent": budget.budgetColor }as any}>
                        {budget.budgetName}
                    </Link>)}
                </td>
            )}
            <td>
                <button
                    type="button"
                    className="btn btn--warning"
                    aria-label={`Delete ${expense.expenseName} expense`}
                    onClick={handleDeleteExpense}
                >
                    <TrashIcon width={20} />
                </button>
            </td>
        </>
    );
};

export default ExpenseItem;
