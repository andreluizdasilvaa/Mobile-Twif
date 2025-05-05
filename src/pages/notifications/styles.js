import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        marginHorizontal: 'auto',
        borderBottomColor: '#808080',
        borderBottomWidth: 0.5,
    },
    headerContent: {
        width: '90%',
        maxWidth: 500,
        marginHorizontal: 'auto',
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default styles;