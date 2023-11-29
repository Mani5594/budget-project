import { useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Budget } from '../../helper';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { CreateExpense, createExpense } from '@/slices/expenseSlice';


interface AddExpenseFormProps {
    budgets: Budget[];
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ budgets }) => {
    const router = useRouter();
    const isSubmittingRef = useRef(false);

    const dispatch = useDispatch<AppDispatch>()

    const formRef = useRef<HTMLFormElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        formRef.current?.reset();
        focusRef.current?.focus();
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;

        try {
            let expensePayload: CreateExpense = {
                expenseName: event.currentTarget.newExpense.value,
                expenseAmount: event.currentTarget.newExpenseAmount.value,
                budgetId: event.currentTarget.newExpenseBudget?.value,
                createdAt: Date.now()
            }
            dispatch(createExpense(expensePayload))
        } catch (error) {
            console.error('Error adding expense:', error);
        } finally {
            isSubmittingRef.current = false;
            resetForm();
        }
    };

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Add New{' '}
                <span className="accent">
                    {budgets.length === 1 && `${budgets.map((budg) => budg.budgetName)}`}
                </span>{' '}
                Expense
            </h2>
            <form
                method="post"
                className="grid-sm"
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="e.g., Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="e.g., ₹3.50"
                            required
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {budgets
                            .map((budget) => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.budgetName}
                                </option>
                            ))}
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark" disabled={isSubmittingRef.current}>
                    {isSubmittingRef.current ? (
                        <span>Submitting...</span>
                    ) : (
                        <>
                            <span>Add Expense</span>
                            <PlusCircleIcon width={20} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddExpenseForm;
