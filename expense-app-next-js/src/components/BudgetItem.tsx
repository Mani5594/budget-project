import Link from 'next/link';
import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
    Budget,
    formatCurrency,
    formatPercentage,
} from '../../helper';
import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '@/store/persistStore';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBudget } from '@/slices/budgetSlice'
import AmountDisplay from './AmountDisplay';

interface BudgetItemProps {
    budget: Budget;
    showDelete?: boolean;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget, showDelete = false }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const {expenses} = useSelector((state: RootState) => state.expense)

        const { id, budgetName, budgetAmount, budgetColor } = budget;

    const calculateSpentByBudget = (budgetId: string): number => {
        const budgetSpent: number = expenses.reduce((acc: number, expense: any) => {
            if (expense.budgetId !== budgetId) return acc;
            return (acc += +expense.expenseAmount);
        }, 0);
        return budgetSpent;
    };
    const spent: number = calculateSpentByBudget(id);

    const handleDeleteClick = () => {
        deleteBudgetItem(id);
    };

    const deleteBudgetItem = (budgetId: string) => {
        try {
            dispatch(deleteBudget(budgetId));
        } catch (e) {
            throw new Error("There was a problem deleting your budget.");
        } finally {
            router.replace('/');
        }
    }

    

    return (
        <div
            className="budget"
            style={{
                '--accent': budgetColor,
            } as any}
        >
            <div className="progress-text">
                <h3>{budgetName}</h3>
                <p>{formatCurrency(budgetAmount)} Budgeted</p>
            </div>
            <progress max={budgetAmount} value={spent}>
                {formatPercentage(spent / budgetAmount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>₹<AmountDisplay value={budgetAmount - spent} /> remaining</small>

            </div>
            {showDelete ? (
                <div className="flex-sm">
                    <button type="submit" className="btn" onClick={handleDeleteClick}>
                        <span>Delete Budget</span>
                        <TrashIcon width={20} />
                    </button>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link href={`/budget/${id}`} className="btn">
                        <span>View Details</span>
                        <BanknotesIcon width={20} />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BudgetItem;
