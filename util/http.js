import axios from 'axios';

const BACKEND_ROOT_URL = 'https://expense-list-testing-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense(expenseData) {
    // Post the new object to the DB and get a response back with an ID.
    const response = await axios.post(BACKEND_ROOT_URL + "/expenses.json", expenseData);
    // Get the response object's id which is stored in the name property.
    const id = response.data.name;
    // Return the id of the newly added object.
    return id;
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