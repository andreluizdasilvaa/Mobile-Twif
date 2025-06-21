import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 8,
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        gap: 12
    },
    input: {
        width: '100%',
        textAlignVertical: 'top',
        height: 50,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
});

export default style;