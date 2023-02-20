import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({label, style, invalid, textInputConfig}) {
    // Initialize the text input styles.
    let inputStyles = [styles.input];

    // Check if if the textInputConfig prop has a multiline property passed to it.
    if(textInputConfig && textInputConfig.multiline) {
        // Add the multiline styles to the standard input styles.
        inputStyles.push(styles.inputMultiline);
    }  

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            {/* We expect that the textInputConfig property will be an object 
                and that the property names should match the prop names */}
            <TextInput style={inputStyles} {...textInputConfig}  />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6, 
        fontSize: 18
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});