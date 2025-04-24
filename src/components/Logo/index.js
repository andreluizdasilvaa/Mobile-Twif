import { Image } from 'expo-image';

export default function Logo({width, height}) {
    return (
        <Image 
            source={require('../../assets/imgs/logo.png')}
            style={{ width: width, height: height, resizeMode: 'contain' }}
        />
    );
}