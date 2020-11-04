import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Settings from './Settings';
import { ContextProvider } from '../Context';

const Stack = new  createStackNavigator();

export default () => {
  
  return (
    <ContextProvider>
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ContextProvider>
  );
}
