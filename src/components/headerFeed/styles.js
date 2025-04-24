import { StyleSheet } from "react-native";;


const styles = StyleSheet.create({
    container: {
        top: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    content: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        borderRadius: '50%',
        width: 50,
        height: 50,
        borderColor: '#000',
        borderWidth: 2
    }
})

export default styles;