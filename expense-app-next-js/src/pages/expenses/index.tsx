import Table from '@/components/Table';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ExpensesPage = () => {
    const {expenses} = useSelector((state: RootState) => state.expense)

    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>
                        Recent Expenses <small>({expenses.length} total)</small>
                    </h2>
                    <Table expenses={expenses} />
                </div>
            ) : (
                <p>No Expenses to show</p>
            )}
        </div>
    )
}

export default ExpensesPage