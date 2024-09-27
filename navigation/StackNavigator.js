// navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import BookingScreen from '../screens/BookingScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f0e68c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20, 
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
