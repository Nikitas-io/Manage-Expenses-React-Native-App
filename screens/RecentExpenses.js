import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';



function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    // The useEffect function itself should not be asynchronous because it would 
    // return a promise and useEffect must not return a promise. Instead, we create
    // another async function to call the fetchExpenses async function.
    async function getExpenses() {
      // Get the expenses asynchronously.
      const expenses = await fetchExpenses();
      // Save the expenses to the context store.
      expensesContext.setExpenses(expenses);
    }

    // Call the async function.
    getExpenses();

  }, []); 

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
