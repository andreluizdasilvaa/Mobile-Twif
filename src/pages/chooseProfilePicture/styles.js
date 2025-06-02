import { StyleSheet } from "react-native";
import fonts from "../../constants/fonts";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6
    },
    title: {
        fontSize: 30,
        fontFamily: fonts.Gilroy_Extrabold
    },
    textDesc: {
        color: colors.secondaryColor,
        fontWeight: '500'
    },
    containerCarrousel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 25
    },
    img: {
        width: 280,
        height: 280,
        borderRadius: 140
    }
})

export default styles;