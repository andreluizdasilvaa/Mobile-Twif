import React, { useRef, useEffect } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SkeletonPlaceholder = ({ widthProp, heightProp, borderRadius = 8, style, colorMode = 'light' }) => {
    const shimmerAnim = useRef(new Animated.Value(-1)).current;

    const baseColor = colorMode === 'light' ? '#e0e0e0' : '#2c2c2e';
    const highlightColor = colorMode === 'light' ? '#f5f5f5' : '#3a3a3c';

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, [shimmerAnim]);

    const translateX = shimmerAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-width, width],
    });

    return (
        <View
            style={[
                {
                    width: widthProp,
                    height: heightProp,
                    borderRadius,
                    backgroundColor: baseColor,
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    { transform: [{ translateX }] },
                ]}
            >
                <LinearGradient
                    colors={[baseColor, highlightColor, baseColor]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

export default SkeletonPlaceholder;
