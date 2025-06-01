import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTittle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    containerForm: {
        width: '90%',
        gap: 12,
    },
    containerInputForm: {
        flexDirection: 'column',
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
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16
    },
    titleTextModal: {
        fontSize: 30,
        fontFamily: fonts.Gilroy_Extrabold,
        marginBottom: 16,
        textAlign: 'center'
    },
    errorText: {
      color: colors.redColor,
      fontSize: 12
    }
});

export default styles;