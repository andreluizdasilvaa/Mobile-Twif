import { Text, TouchableOpacity  } from 'react-native';

import styles from './styles'

export default function StandardButton({ children, style, ...rest }) {
   return(
    <TouchableOpacity {...rest} style={[styles.button, style]}>
        <Text style={styles.textBtn}>{children}</Text>
    </TouchableOpacity>
   )
}

