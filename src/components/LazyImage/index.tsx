import React, {useRef} from 'react';
import {Animated} from 'react-native';

import {Small, Original} from './styles';

interface LazyImageProps {
  smallSource: string;
  source: string;
  aspectRatio: number;
}

export const LazyImage = ({
  smallSource,
  source,
  aspectRatio,
}: LazyImageProps) => {
  const opacity = useRef<any>(new Animated.Value(0)).current;

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small
      source={{uri: smallSource}}
      aspectRatio={aspectRatio}
      resizeMode="contain"
      blurRadius={1}>
      <Original
        style={{opacity}}
        source={{uri: source}}
        aspectRatio={aspectRatio}
        resizeMode="contain"
        onLoadEnd={handleAnimate}
      />
    </Small>
  );
};
