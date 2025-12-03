import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScanScreen } from './src/screens/ScanScreen';
import { ReviewLabelsScreen } from './src/screens/ReviewLabelsScreen';
import { DatasetListScreen } from './src/screens/DatasetListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Review" component={ReviewLabelsScreen} />
        <Stack.Screen name="Dataset" component={DatasetListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
