import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';



function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  // State to manage the loading spinner.
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // The useEffect function itself should not be asynchronous because it would 
    // return a promise and useEffect must not return a promise. Instead, we create
    // another async function to call the fetchExpenses async function.
    async function getExpenses() {
      // Enable the loading spinner.
      setIsFetching(true);
      // Get the expenses asynchronously.
      const expenses = await fetchExpenses();
      // Disable the loading spinner after the expenses have loaded.
      setIsFetching(false);
      // Save the expenses to the context store.
      expensesContext.setExpenses(expenses);
    }

    // Call the async function.
    getExpenses();

  }, []); 

  // Check if there's data being fetched from the DB.
  if(isFetching) {
    // Show the loading overlay.
    return <LoadingOverlay/>
  }


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
