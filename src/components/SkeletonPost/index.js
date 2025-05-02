import React, { memo } from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from './SkeletonPlaceholder';
import styles from './styles';

const SkeletonPost = () => {
    const colorMode = 'light';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SkeletonPlaceholder
                    widthProp={40}
                    heightProp={40}
                    borderRadius={20}
                    colorMode={colorMode}
                />
                <View>
                    <SkeletonPlaceholder
                        widthProp={120}
                        heightProp={15}
                        style={{ marginLeft: 8 }}
                        colorMode={colorMode}
                    />
                    <SkeletonPlaceholder
                        widthProp={80}
                        heightProp={12}
                        style={{ marginTop: 6, marginLeft: 8 }}
                        colorMode={colorMode}
                    />
                </View>
            </View>

            <View style={styles.content}>
                <SkeletonPlaceholder
                    widthProp="100%"
                    heightProp={40}
                    colorMode={colorMode}
                />
            </View>

            <View style={styles.footer}>
                <SkeletonPlaceholder
                    widthProp={40}
                    heightProp={20}
                    colorMode={colorMode}
                />
                <SkeletonPlaceholder
                    widthProp={40}
                    heightProp={20}
                    colorMode={colorMode}
                />
            </View>
        </View>
    );
};

export default memo(SkeletonPost);
