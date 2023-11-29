export const waait = (): Promise<void> =>
    new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = async (): Promise<string> => {
    try {
        const data = await fetchData("budgets");
        const existingBudgetLength: number = (data?.length as number) ?? 0;
        return `${existingBudgetLength * 34} 65% 50%`;
    } catch (error) {
        console.error('Error generating random color:', error);
        return ''; // Handle error as needed
    }
};



//Local storage
export const fetchData = async (key: string): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:3100/api/${key}`); // Update the API endpoint
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


// Get all items from local storage
export const getAllMatchingItems = async ({ category, key, value }: { category: string; key: string; value: any }): Promise<any[]> => {
    try {
        const data = await fetchData(category);
        const dataArray = data ?? [];
        return dataArray.filter((item: any) => item[key] === value);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// delete item from local storage
export const deleteItem = async ({ key, id }: { key: string; id?: string }): Promise<void> => {
    try {
        if (id) {
            // Assuming you have an API endpoint for deleting items by ID
            const response = await fetch(`http://localhost:3100/${key}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // If the deletion is successful, you can update your local state or trigger a re-fetch
                console.log(`Item with ID ${id} deleted successfully.`);
            } else {
                console.error('Failed to delete item:', response.statusText);
            }
        } else {
            console.error('ID is required for deletion.');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};


// create budget
export const createBudget = async ({ name, amount }: { name: string; amount: number }): Promise<void> => {
    try {
        // Assuming you have an API endpoint for creating budgets
        const response = await fetch('http://localhost:3100/budgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                amount,
                createdAt: Date.now(),
                color: generateRandomColor(),
            }),
        });

        if (response.ok) {
            // If the creation is successful, you can update your local state or trigger a re-fetch
            console.log('Budget created successfully.');
        } else {
            console.error('Failed to create budget:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating budget:', error);
    }
};

// create expense
export const createExpense = async ({ name, amount, budgetId }: { name: string; amount: number; budgetId: string }): Promise<void> => {
    try {
        // Assuming you have an API endpoint for creating expenses
        const response = await fetch('http://localhost:3100/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                amount,
                budgetId,
                createdAt: Date.now(),
            }),
        });

        if (response.ok) {
            // If the creation is successful, you can update your local state or trigger a re-fetch
            console.log('Expense created successfully.');
        } else {
            console.error('Failed to create expense:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating expense:', error);
    }
};

// total spent by budget
export const calculateSpentByBudget = async (budgetId: string): Promise<number> => {
    try {
        const expenses = await fetchData("expenses") ?? [];
        const budgetSpent = expenses.reduce((acc: number, expense: any) => {
            if (expense.budgetId !== budgetId) return acc;
            return (acc += expense.amount);
        }, 0);
        return budgetSpent;
    } catch (error) {
        console.error('Error calculating spent by budget:', error);
        return 0; // Handle error as needed
    }
};

// FORMATTING
export const formatDateToLocaleString = (epoch: number): string =>
    new Date(epoch).toLocaleDateString();

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
