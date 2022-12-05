import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Start } from '../pages/Fibonacci/Start';
import { All } from '../pages/Fibonacci/All';



import {
    HOME,
    LOGIN,
    ALL_FIBONACCI,
    START_FIBONACCI
  } from './pathName';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LOGIN">
            <Stack.Screen name={HOME} component={Home} />
            <Stack.Screen name={LOGIN} component={Login} />
            <Stack.Screen name={START_FIBONACCI} component={Start} />
            <Stack.Screen name={ALL_FIBONACCI} component={All} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}