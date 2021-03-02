import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './routes';
import {enableScreens} from 'react-native-screens';
import {StatusBar} from 'react-native';

enableScreens();
export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Routes />
    </NavigationContainer>
  );
};
