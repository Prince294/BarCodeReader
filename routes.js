import { useEffect, useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import BarCodeScreen from './screens/BarCodeScanner';
import FormsDashboard from './screens/FormsDashboard';
import VehicleLogBookOutForm from './screens/VehicleLogBookOutForm';
import VehicleLogBookInForm from './screens/VehicleLogBookInForm';
import DWR from './screens/DWR';
import DI from './screens/DI';
import JobCard from './screens/JobCard';
import BreakDown from './screens/BreakDown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
export default function Router() {
    const [startWith, setStartWith] = useState('Login')
    const token = useSelector(state => state?.LoginReducer?.token);
    const isLoggedIn = useSelector(state => state?.LoginReducer?.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn && token !== '') {
            setStartWith('Scanner')
        }
    }, [])

    return (
        <Stack.Navigator initialRouteName={startWith} screenOptions={{
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
    )
}