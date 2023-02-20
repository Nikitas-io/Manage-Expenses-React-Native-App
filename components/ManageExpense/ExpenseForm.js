import { useState } from "react";
import { View } from "react-native";
import Input from "./Input";

function ExpenseForm() {

    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: '',
      });
    
      function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
          return {
            ...curInputValues,
            [inputIdentifier]: enteredValue, // Dynamically target the property you need to update.
          };
        });
      }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                style={styles.rowInput}
                label="Amount"
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'), // Change the value of the 'amount' textInput.
                    value: inputValues.amount,
                }}
                />
                <Input
                style={styles.rowInput}
                label="Date"
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'), // Change the value of the 'date' textInput.
                    value: inputValues.date,
                }}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                multiline: true,
                // autoCapitalize: 'none'
                // autoCorrect: false // default is true
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputValues.description,
                }}
            />
        </View>
    )
}

export default ExpenseForm;