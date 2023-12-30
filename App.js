
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import BarCodeScreen from './screens/BarCodeScanner';
import FormsDashboard from './screens/FormsDashboard';
import { StatusBar } from 'expo-status-bar'
import VehicleLogBookOutForm from './screens/VehicleLogBookOutForm';
import VehicleLogBookInForm from './screens/VehicleLogBookInForm';
import DWR from './screens/DWR';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: true, headerStyle: {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
        }
      }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Scanner" component={BarCodeScreen} />
        <Stack.Screen name="FormsDashboard" component={FormsDashboard} />

        <Stack.Screen name="VehicleLogBookOutForm" component={VehicleLogBookOutForm} />
        <Stack.Screen name="VehicleLogBookInForm" component={VehicleLogBookInForm} />

        <Stack.Screen name="DWR" component={DWR} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;