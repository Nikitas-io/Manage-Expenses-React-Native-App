import { View } from "react-native";

function Input({label, textInputConfig}) {
    return (
        <View>
            <Text>{label}</Text>
            {/* We expect that the textInputConfig property will be an object 
                and that the property names should match the prop names */}
            <TextInput {...textInputConfig} />
        </View>
    )
}

export default Input;