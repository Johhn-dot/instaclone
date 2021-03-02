import React from 'react';
import {Image} from 'react-native';

import logoImg from './assets/instagram.png';

import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Feed} from './pages/Feed';

const AppStack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerCenter: () => <Image source={logoImg} />,
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}>
      <AppStack.Screen name="Feed" component={Feed} />
    </AppStack.Navigator>
  );
};
