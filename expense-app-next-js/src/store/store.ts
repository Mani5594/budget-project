import { configureStore } from "@reduxjs/toolkit";
import budgedReducer from '../slices/budgetSlice'
import expenseReducer from '../slices/expenseSlice'
import authReducer from '../slices/authSlice'
import spinnerReducer from '../slices/spinnerSlice'

export function makeStore() {
    return configureStore(
        {
            reducer: {
                budget: budgedReducer,
                expense: expenseReducer,
                auth: authReducer,
                spinner: spinnerReducer
            }
        }
    )
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch