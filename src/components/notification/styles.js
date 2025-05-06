import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 700,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 26,
        paddingRight: 26,
        borderBottomWidth: 1,
        backgroundColor: colors.whiteColor,
        borderBottomColor: colors.grayLightColor,
        alignItems: 'center',
        flexWrap: 'wrap'  
    },
    content: {
        flexDirection: 'row',
        flex: 1,          
        flexWrap: 'wrap' 
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        minWidth: 0     
    },
    userNames: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'wrap' 
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    userNick: {
        fontSize: 14,
        color: colors.grayColor,
    },
    actionText: {
        fontSize: 14,
        flexWrap: 'wrap',   
        flexShrink: 1,        
        width: '100%'        
    },
    previewText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: colors.grayColor,
        marginTop: 4,
        flexWrap: 'wrap'      
    },
    timeText: {
        fontSize: 12,
        color: colors.grayColor,
        marginTop: 4,
    },
    emptyMessage: {
        fontSize: 16,
        color: colors.grayColor,
        textAlign: 'center',
        padding: 20,
    }
});

export default styles;