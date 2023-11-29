import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { hideSpinner, showSpinner } from "./spinnerSlice";
import { waait } from "../../helper";
import { clearExpenses } from "./expenseSlice";
import { clearBudgets } from "./budgetSlice";

export interface LoginPayload {
    userName: string;
    password: string;
}

export const clearState = (thunkApi: any) => {
    thunkApi.dispatch(clearExpenses());
    thunkApi.dispatch(clearBudgets());
    thunkApi.dispatch(clearAccessToken());
    toast.error('Please login to continue');

    console.error("Unauthorized access. Redirecting to login...");
};

export const signIn = createAsyncThunk('auth/signin', async (loginPayload: LoginPayload, { rejectWithValue, dispatch }) => {
    try {
        dispatch(showSpinner())
        const response = await fetch(`http://localhost:3100/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginPayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            dispatch(hideSpinner())
            return rejectWithValue(errorData);
        }
    
        const data = await response.json();
        dispatch(hideSpinner())
        return data;
    } catch (error) {
        dispatch(hideSpinner())
        return rejectWithValue({ message: 'An error occurred during sign-in.' });
        
    }
});

export const signUp = createAsyncThunk('auth/signup', async (loginPayload: LoginPayload, { rejectWithValue, dispatch }) => {
    try {
        dispatch(showSpinner())
        const response = await fetch("http://localhost:3100/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginPayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            dispatch(hideSpinner())
            return rejectWithValue(errorData);
        }

        const data = await response.json();
        dispatch(hideSpinner())
        return data;
    } catch (error) {
        dispatch(hideSpinner())
        return rejectWithValue({ message: 'An error occurred during sign-up.' });
    }
});



export interface AuthState {
    auth: {accessToken: string, userName: string};
}
const initialState: AuthState = {
    auth: {},
} as any

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        clearAccessToken: (state) => {
            state.auth = {} as any;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.auth = action.payload;
                toast.success("SignIn successfully!");
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.auth = action.payload;
                toast.success("SignUp successfully!");
            })
            .addCase(signIn.rejected, (state, action) => {
                if (isRejectedWithValue(action)) {
                    const payload: any = action.payload;
                    toast.error(`${payload.message}`);
                } else {
                    toast.error("Signin failed");
                }
            })
            .addCase(signUp.rejected, (state, action) => {
                if (isRejectedWithValue(action)) {
                    const payload: any = action.payload;
                    toast.error(`${payload.message}`);
                } else {
                    toast.error("Signup failed");
                }
            });
        },
})

export const { clearAccessToken } = authSlice.actions;

export default authSlice.reducer