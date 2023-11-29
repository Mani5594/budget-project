export interface Budget {
    id: string;
    budgetName: string;
    budgetAmount: number;
    budgetColor: string;
    createdAt: number;
}

export interface Expense {
    id: string;
    expenseName: string;
    expenseAmount: number;
    createdAt: number;
    budgetId: string;
}

export const waait = (): Promise<void> =>
    new Promise((res) => setTimeout(res, Math.random() * 8000));

// colors
export const generateRandomColor = (budgetLength?: number): string => {
    const existingBudgetLength: number = (budgetLength as number) ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`;
};



//Local storage
export const fetchData = (key: string): any => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key) as string);
    }
};


// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }: { category: string; key: string; value: any }): any[] => {
    const data = fetchData(category) ?? [];
    return data.filter((item: any) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }: { key: string; id?: string }): void => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item: any) => item.id !== id);
        localStorage.setItem(key, JSON.stringify(newData));
    } else {
        localStorage.removeItem(key);
    }
};

// create budget
export const createBudget = ({ name, amount }: { name: string; amount: number }): void => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    };
    const existingBudgets = fetchData("budgets") ?? [];
    localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
};

// create expense
export const createExpense = ({ name, amount, budgetId }: { name: string; amount: number; budgetId: string }): void => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    };
    const existingExpenses = fetchData("expenses") ?? [];
    localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
};

// total spent by budget
export const calculateSpentByBudget = (budgetId: string): number => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc: number, expense: any) => {
        if (expense.budgetId !== budgetId) return acc;
        return (acc += expense.amount);
    }, 0);
    return budgetSpent;
};

// Formating percentages
export const formatPercentage = (amt: number): string => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    });
};

// Format currency
export const formatCurrency = (amt: number): string => {
    return '₹' + amt;
};
