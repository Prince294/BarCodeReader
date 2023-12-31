
import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import BarCodeScreen from './screens/BarCodeScanner';
import FormsDashboard from './screens/FormsDashboard';
import { StatusBar } from 'expo-status-bar'
import VehicleLogBookOutForm from './screens/VehicleLogBookOutForm';
import VehicleLogBookInForm from './screens/VehicleLogBookInForm';
import DWR from './screens/DWR';
import DI from './screens/DI';
import JobCard from './screens/JobCard';
import BreakDown from './screens/BreakDown';



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
        <Stack.Screen name="DI" component={DI} />
        <Stack.Screen name="JobCard" component={JobCard} />
        <Stack.Screen name="BreakDown" component={BreakDown} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;