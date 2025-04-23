import { View, Text, Button } from "react-native";
import { Image } from "expo-image";

import styles from "./styles";

export default function Post({ picture, nameUser, description, quantLike, quantComment }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: picture }}
                    style={styles.imageUser}
                />
                <Text>{nameUser}</Text>
            </View>

            <View style={styles.content}>
                <Text>{description}</Text>
            </View>

            <View style={styles.footer}>
                <Button title={`Curtidas: ${quantLike}`} onPress={() => {}} />
                <Button title={`Comentários: ${quantComment}`} onPress={() => {}} />
            </View>
        </View>
    );
}
