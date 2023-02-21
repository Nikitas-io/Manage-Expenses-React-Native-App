import axios from 'axios';

const BACKEND_ROOT_URL = 'https://expense-list-testing-default-rtdb.europe-west1.firebasedatabase.app';

export function storeExpense(expenseData) {
    axios.post(
        BACKEND_ROOT_URL + "/expenses.json",
        expenseData
    );
}

export async function fetchExpenses() {
    // Since this function is asynchronous, we await for the response.
    const response = await axios.get(BACKEND_ROOT_URL + "/expenses.json");

    // Initialize an array to hold the expenses fetched from the backend.
    const expenses = [];

    console.log('The response data: ', response.data)

    // Loop through the response object's data.
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }

        expenses.push(expenseObj)
    }

    return expenses;
}