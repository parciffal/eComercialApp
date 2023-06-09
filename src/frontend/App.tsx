import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {StatusBar} from 'react-native';
import COLORS from './src/consts/colors';

import LoginPage from './src/view/pages/auth/LogInPage';
import RegisterPage from './src/view/pages/auth/RegisterPage';
import HomePage from './src/view/pages/home/HomePage';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="LogIn" component={LoginPage}/>
        <Stack.Screen name="RegIn" component={RegisterPage}/>
        <Stack.Screen name="Home" component={HomePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;