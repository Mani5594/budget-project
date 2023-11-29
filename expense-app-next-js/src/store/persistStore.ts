import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

import budgedReducer, { BudgetState } from '../slices/budgetSlice';
import expenseReducer from '../slices/expenseSlice';
import spinnerReducer from '../slices/spinnerSlice';
import authReducer, { AuthState } from '../slices/authSlice';

const persistConfig = {
    key: 'root',
    storage,
};

export interface RootStateType {
    budget: BudgetState;
    expense: any;
    auth: AuthState;
}

const persistedBudgetReducer = persistReducer({ key: 'budget', storage }, budgedReducer);
const persistedExpenseReducer = persistReducer({ key: 'expense', storage }, expenseReducer);
const persistedAuthReducer = persistReducer({ key: 'auth', storage }, authReducer);
const persistedSpinnerReducer = persistReducer({ key: 'spinner', storage }, spinnerReducer);

export function makeStore() {
    const store = configureStore({
        reducer: {
            budget: persistedBudgetReducer,
            expense: persistedExpenseReducer,
            auth: persistedAuthReducer,
            spinner: persistedSpinnerReducer
        },
    });

    const persistor = persistStore(store);

    return { store, persistor };
}

export const { store, persistor } = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
