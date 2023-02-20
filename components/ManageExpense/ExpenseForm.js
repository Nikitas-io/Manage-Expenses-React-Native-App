import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";

import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {

    const [inputs, setInputs] = useState({
        // Set the default values if there are any, for the editing mode.
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true // Setting the initial input validity to true in order to hide the invalid input message.
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
            ...currentInputs,
            [inputIdentifier]: {value: enteredValue, isValid: true}, // Dynamically target the property you need to update.
            };
        });
    }
    

    function submitHandler() {
        // Transform the input values.
        const expenseData = {
            amount: +inputs.amount.value, // The plus converts the string into a number.
            date: new Date(inputs.date.value), // Convert the date-text into an actuall date object.
            description: inputs.description.value
        }

        // Form data validation.
        // Check if the amount is a number greater than 0.
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        // Check if the date format is invalid.
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        // Check if the description is empty.
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Update the validity of each input.
            setInputs((curInputs) => {
                return {
                  amount: { value: curInputs.amount.value, isValid: amountIsValid },
                  date: { value: curInputs.date.value, isValid: dateIsValid },
                  description: {
                    value: curInputs.description.value,
                    isValid: descriptionIsValid,
                  },
                };
              });

            return 
        }

        // On submit, send the expense data to the parent component.
        onSubmit(expenseData);
    }

    // Check if any input is invalid.
    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'), // Change the value of the 'amount' textInput.
                        value: inputs.amount.value,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'), // Change the value of the 'date' textInput.
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    // autoCapitalize: 'none'
                    // autoCorrect: false // default is true
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,
                }}
            />

            {/* Input validation message */}
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values. - Please check your values and try again.</Text>}

            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
        button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
