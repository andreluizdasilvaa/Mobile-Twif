import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";


const styles = StyleSheet.create({
    container: {
        top: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    content: {
        flexDirection: 'row',
        width: '90%',
        maxWidth: 500,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        borderRadius: 25,
        width: 50,
        height: 50,
        borderColor: Colors.blackColor,
        borderWidth: 1
    }
})

export default styles;