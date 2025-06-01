import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
    containerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: colors.blackColor,
        borderWidth: 2,
        paddingHorizontal: 6,
        maxHeight: 40,
        width: '100%',
    },
    Picker: {
        width: '95%'
    }
});

export default styles;