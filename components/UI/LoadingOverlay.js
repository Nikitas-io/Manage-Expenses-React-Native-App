import { StyleSheet } from "react-native";
import { View, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay() {
    return (
        <View style={sytles.container}>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}

export default LoadingOverlay;

const sytles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
});