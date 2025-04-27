import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
    containerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
        borderColor: colors.blackColor,
        borderWidth: 2,
        paddingHorizontal: 6,
        maxHeight: 40,
        width: '100%',
    },
    input: {
        height: 40,
        width: '90%',
        backgroundColor: 'trasparent',
        borderWidth: 0,
        outlineStyle: 'none',
    },
    buttonText: {
        lineHeight: 40,
        paddingLeft: 12,
    }
});

export default styles;