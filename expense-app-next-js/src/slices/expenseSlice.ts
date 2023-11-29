import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Expense } from '../../helper'
import { toast } from "react-toastify";
import { RootStateType } from "@/store/persistStore";
import { hideSpinner, showSpinner } from "./spinnerSlice";
import { clearState } from "./authSlice";

export interface CreateExpense {
    expenseName: string;
    expenseAmount: number;
    budgetId: string;
    createdAt: number;
}

export const fetchExpense = createAsyncThunk('expense/getAllExpense', async (_, thunkApi) => {
    const state: RootStateType  = thunkApi.getState() as RootStateType;
    const accessToken = state.auth.auth.accessToken;
    thunkApi.dispatch(showSpinner())
    const response = await fetch("http://localhost:3100/expenses", {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        if (response.status === 401) {
            clearState(thunkApi);
        }
    }
    const data = await response.json();
    thunkApi.dispatch(hideSpinner())
    return data;
})

export const createExpense = createAsyncThunk('expense/createExpense', async (newExpenseData: CreateExpense, thunkApi) => {
    const state: RootStateType  = thunkApi.getState() as RootStateType;
    const accessToken = state.auth.auth.accessToken;
    thunkApi.dispatch(showSpinner())

    const response = await fetch("http://localhost:3100/expenses", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newExpenseData),
    });

    if (!response.ok) {
        if (response.status === 401) {
            clearState(thunkApi);
        }
    }
    const data = await response.json();
    thunkApi.dispatch(hideSpinner())
    return data;
});

export const deleteExpense = createAsyncThunk('expense/deleteExpense', async (expenseId: string, thunkApi) => {
    const state: RootStateType  = thunkApi.getState() as RootStateType;
    const accessToken = state.auth.auth.accessToken;
    thunkApi.dispatch(showSpinner())

    const response = await fetch(`http://localhost:3100/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            clearState(thunkApi);
        }
    }
    // const data = await response.json();
    thunkApi.dispatch(hideSpinner())
    return expenseId;
});

export interface ExpenseState {
    expenses: Expense[];
}

const initialState: ExpenseState = {
    expenses: [],
} as any

const expenseSlice = createSlice({
    name: 'expenseSlice',
    initialState,
    reducers: {
        clearExpenses: (state) => {
            state.expenses = [] as any;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpense.fulfilled, (state, action) => {
                state.expenses = action.payload;
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.expenses.push(action.payload);
                toast.success("Expense created successfully!");
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter((expense: Expense) => expense.id !== action.payload);
                toast.success("Expense deleted successfully!");
            })
            .addCase(fetchExpense.rejected, () => {
                toast.error("Budgets fetch failed!");
            })
            .addCase(createExpense.rejected, () => {
                toast.error("Budget created failed!");
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                console.error('Delete Expense Rejected:', action.error);
                toast.error("Budget deleted failed!");
            })
    }
})

export const { clearExpenses } = expenseSlice.actions;

export default expenseSlice.reducer
