import { StyleSheet } from "react-native";

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
        color: '#025648',
    },
    linkHook: {
        textDecorationLine: 'underline',
    },
});

export default styles;