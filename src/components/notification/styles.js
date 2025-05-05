import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 700,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 26,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
        marginVertical: 4,
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
        color: '#666',
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
        color: '#666',
        marginTop: 4,
        flexWrap: 'wrap'      
    },
    timeText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});

export default styles;