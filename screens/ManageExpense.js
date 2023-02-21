import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  // A flag to check if the user is currently submitting data, 
  // so that we can show a spinner when it is appropriate.
  const [isSubmitting, setIsSubmitting] = useState(false);
  // A state to handle the error overlay.
  const [error, setError] = useState();

  // To check if this screen is going to be used to edit an item, we 
  // are checking to see if an expense ID is being passed to it.
  const editedExpenseId = route.params?.expenseId;
  // Convert the ID value into a boolean ('true' if defined, 'false' if it's not).
  const isEditing = !!editedExpenseId;
  // Get the selected expense from the context store.
  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    // Enable the loading ring.
    setIsSubmitting(true);
    
    try{
      // Submit the delete request.
      await deleteExpense(editedExpenseId);

      // There is no need to disable the loading ring because the modal
      // will be closed anyway after deleting the expense.
      // setIsSubmitting(false);
  
      // Delete the expense from the context store.
      expensesCtx.deleteExpense(editedExpenseId);
      // Close the modal.
      navigation.goBack();
    } catch(error) {
      setError('Could not delete expense.')
      // Disable the loading ring.
      setIsSubmitting(false);
    }
    

  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    // Enable the loading ring.
    setIsSubmitting(true);


    try {
      if (isEditing) {
        // Optimistically update the expense on the DB.
        await updateExpense(editedExpenseId, expenseData);
        // Update the expense on the local context store.
        expensesCtx.updateExpense(editedExpenseId, expenseData);
      } else {
        // Send a post request to the firebase server.
        const id = await storeExpense(expenseData);
        // Store the new expense object to the store.
        expensesCtx.addExpense({...expenseData, id: id});
      }

      // There is no need to disable the loading ring because the modal
      // will be closed anyway after updating or adding an expense.
      // setIsSubmitting(false);
  
      navigation.goBack();
    } catch (error) {
      setError('Could not save data');
      setIsSubmitting(false);
    }

  }

  if(error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  // Check if an HTTP request is currently under way.
  if(isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}> 
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
     
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
