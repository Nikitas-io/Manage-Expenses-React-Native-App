import axios from 'axios';

export function storeExpense(expenseData) {
    axios.post(
        'https://expense-list-testing-default-rtdb.europe-west1.firebasedatabase.app/expenses.json',
        expenseData
    )
}