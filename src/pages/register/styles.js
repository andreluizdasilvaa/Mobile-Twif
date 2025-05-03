import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerForm: {
        width: '90%',
        gap: 24,
    },
    containerInputForm: {
        flexDirection: 'column',
        gap: 12,
    },
    textBottomBtnSubmit: {
        textAlign: 'center',
        color: colors.secondaryColor,
    },
    linkHook: {
        textDecorationLine: 'underline',
        color: colors.secondaryColor,
        fontWeight: 'bold',
    },
});

export default styles;