import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MapScreen from './MapScreen';
import SensorScreen from './SensorScreen';

const Navigation = () => {

  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Map"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#232F3E',
                    shadowColor: 'transparent'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="Map"
                component={MapScreen} 
                options={{
                    title: 'Bay Health'
            }}
            />
            <Stack.Screen
                name="Sensor" 
                component={SensorScreen} 
                options={{
                    title: 'Sensor Detail',
                    headerBackTitleVisible: false
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>
    );
};

export default Navigation;
