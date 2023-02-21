import { StyleSheet, View, Text, Button } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({message, onConfirm}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occured!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button title="Ok!" onPress={onConfirm} />
        </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: "white"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    }
});