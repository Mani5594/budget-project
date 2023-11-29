import { useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { CreateBudget, createBudget } from '@/slices/budgetSlice';
import { generateRandomColor } from '../../helper';

const AddBudgetForm: React.FC = () => {
    const router = useRouter();
    const isSubmittingRef = useRef(false);

    const dispatch = useDispatch<AppDispatch>()
    const {budgets} = useSelector((state: RootState) => state.budget)

    const formRef = useRef<HTMLFormElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isSubmittingRef.current) {
            formRef.current?.reset();
            focusRef.current?.focus();
        }
    }, [isSubmittingRef.current]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        try {
            let budgetPayload: CreateBudget = {
                budgetName: event.currentTarget.newBudget.value,
                budgetAmount: event.currentTarget.newBudgetAmount.value,
                budgetColor: generateRandomColor(budgets.length),
                createdAt: Date.now()
            }
            dispatch(createBudget(budgetPayload))
        } catch (error) {
            console.error('Error creating budget:', error);
        } finally {
            isSubmittingRef.current = false;
        }
    };

    return (
        <div className="form-wrapper">
            <h2 className="h3">Create budget</h2>
            <form
                method="post"
                className="grid-sm"
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input
                        type="text"
                        name="newBudget"
                        id="newBudget"
                        placeholder="e.g., Groceries"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="e.g., ₹350"
                        required
                        inputMode="decimal"
                    />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark">
                    {isSubmittingRef.current ? (
                        <span>Submitting...</span>
                    ) : (
                        <>
                            <span>Create budget</span>
                            <CurrencyDollarIcon width={20} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddBudgetForm;
