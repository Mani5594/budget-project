import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Budget } from '../../helper'
import { toast } from "react-toastify";
import { RootState, RootStateType } from "@/store/persistStore";
import { hideSpinner, showSpinner } from "./spinnerSlice";
import { clearState } from "./authSlice";

export interface CreateBudget {
    budgetName: string;
    budgetAmount: number;
    budgetColor: string;
    createdAt: number;
}

export const fetchBudgets = createAsyncThunk('budgets/getAllBudgets', async (_ , thunkApi) => {
    const state: RootStateType  = thunkApi.getState() as RootStateType;
    const accessToken = state.auth.auth.accessToken;
    thunkApi.dispatch(showSpinner())
    const response = await fetch("http://localhost:3100/budgets", {
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

export const createBudget = createAsyncThunk('budgets/createBudget', async (newBudgetData: CreateBudget, thunkApi) => {
    const state: RootStateType  = thunkApi.getState() as RootStateType;
    const accessToken = state.auth.auth.accessToken;
    thunkApi.dispatch(showSpinner())
    const response = await fetch("http://localhost:3100/budgets", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newBudgetData),
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

export const deleteBudget = createAsyncThunk('budgets/deleteBudget', async (budgetId: string, thunkApi) => {
    const state: RootStateType  = thunkApi.getState() as RootStateType;
    const accessToken = state.auth.auth.accessToken;
    thunkApi.dispatch(showSpinner())
    const response = await fetch(`http://localhost:3100/budgets/${budgetId}`, {
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
    thunkApi.dispatch(hideSpinner())
    return {budgetId};
});

export const fetchBudgetById = createAsyncThunk('budgets/fetchBudgetById', async (budgetId: string, thunkApi) => {
    const state: RootStateType  = thunkApi.getState() as RootStateType;
    const accessToken = state.auth.auth.accessToken;
    thunkApi.dispatch(showSpinner())
    const response = await fetch(`http://localhost:3100/budgets/${budgetId}`, {
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
});

export interface BudgetState {
    budgets: Budget[];
}
const initialState: BudgetState = {
    budgets: [],
} as any

const budgetSlice = createSlice({
    name: 'budgetSlice',
    initialState,
    reducers: {
        clearBudgets: (state) => {
            state.budgets = [] as any;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBudgets.fulfilled, (state, action) => {
                state.budgets = action.payload;
            })
            .addCase(createBudget.fulfilled, (state, action) => {
                state.budgets.push(action.payload);
                toast.success("Budget created successfully!");
            })
            .addCase(deleteBudget.fulfilled, (state, action) => {
                state.budgets = state.budgets.filter((budget: Budget) => budget.id !== action.payload.budgetId);
                toast.success("Budget deleted successfully!");
            })
            .addCase(fetchBudgets.rejected, () => {
                toast.error("Budgets fetch failed!");
            })
            .addCase(createBudget.rejected, () => {
                toast.error("Budget created failed!");
            })
            .addCase(deleteBudget.rejected, () => {
                toast.error("Budget deleted failed!");
            })
    }
})

export const { clearBudgets } = budgetSlice.actions;

export default budgetSlice.reducer