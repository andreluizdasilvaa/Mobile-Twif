import { StyleSheet } from "react-native"
import colors from "../../constants/colors"
import fonts from '../../constants/fonts'

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%'
    },
    containerLogo: {
      marginBottom: 28
    },
    containerForm: {
      width: '90%',
      flexDirection: 'column',
      gap: 12,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [
        { translateX: '-50%' },
        { translateY: '-50%' }
      ],
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      zIndex: 4
    },
    containerInputForm: {
      width: '100%',
      marginBottom: 24
    },
    forgotPassword: {
      textAlign: 'right',
      flexDirection: 'row',
      color: colors.secondaryColor,
      fontWeight: '600',
    },
    linkHook: {
      textDecorationLine: 'underline',
      color: colors.secondaryColor,
      fontWeight: 'bold',
    },
    containerInputSubmit: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInputSubmit: {
      fontFamily: fonts.Gilroy_Extrabold
    },
    errorText: {
      color: colors.redColor,
      fontSize: 12
    }
})

export default styles