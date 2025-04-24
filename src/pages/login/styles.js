import { StyleSheet } from "react-native"

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
      color: '#025648',
      fontWeight: '600',
    },
    linkHook: {
      textDecorationLine: 'underline'
    },
    containerInputSubmit: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default styles