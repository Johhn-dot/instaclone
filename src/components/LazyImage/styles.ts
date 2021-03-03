import styled from 'styled-components/native';
import {Animated} from 'react-native';

interface ImageProps {
  aspectRatio: number;
}

export const Small = styled.ImageBackground<ImageProps>`
  width: 100%;
`;

export const Original = styled(Animated.Image)<ImageProps>`
  width: 100%;
`;
