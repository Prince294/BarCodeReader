import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { StackActions } from '@react-navigation/native';
import backgroundImage from '../assets/login/background.png'
import { apisPath } from '../utils/path';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/action';


export default function LoginScreen({ navigation }) {
    // const navigation = useNavigation();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [formBody, setFormBody] = useState({ username: '', password: '' });

    const loginHandler = async () => {
        if (formBody?.username === '' || formBody?.password === '') {
            Alert.alert(`Input fields must not be blank`);
            return;
        }
        setLoading(true)
        const form_data = new FormData();
        form_data.append('username', formBody?.username);
        form_data.append('password', formBody?.password);

        await fetch(apisPath?.front?.login, {
            method: 'POST',
            body: form_data,
        }).then(response => response.json())
            .then(res => {
                // console.log(res);
                setLoading(false)
                if (res?.success) {
                    dispatch(userLogin(res?.token));
                    Alert.alert('Success', 'Successfully Logged In', [
                        {
                            text: 'OK', onPress: () => navigation.dispatch(
                                StackActions.replace('Scanner')
                            )
                        },
                    ]);
                }
                else {
                    setLoading(false)
                    Alert.alert(`Error: ${res?.message}`)
                }
            })
            .catch(error => {
                // console.error(error);
                setLoading(false)
                Alert.alert(`Error ${err}`)
            });
    }

    const handleInputChange = (field, value) => {
        setFormBody({ ...formBody, [field]: value });
    };

    return (
        <View className="bg-white h-full w-full">
            {loading && <Loader />}
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={backgroundImage} />

            {/* lights */}
            <View className="flex-row justify-around w-full absolute">
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    source={require('../assets/login/light.png')}
                    className="h-[225] w-[90]"
                />
                <Animated.Image
                    entering={FadeInUp.delay(400).duration(1000).springify()}
                    source={require('../assets/login/light.png')}
                    className="h-[160] w-[65] opacity-75"
                />
            </View>

            {/* title and form */}
            <View className="h-full w-full flex justify-around pt-40 pb-10">

                {/* title */}
                <View className="flex items-center">
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        className="text-white font-bold tracking-wider text-5xl">
                        Login
                    </Animated.Text>
                </View>

                {/* form */}
                <View className="flex items-center mx-5 space-y-4">
                    <Animated.View
                        entering={FadeInDown.duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full">

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={'gray'}
                            value={formBody?.username}
                            onChangeText={value => handleInputChange('username', value)}
                        />
                    </Animated.View>
                    <Animated.View
                        entering={FadeInDown.delay(300).duration(1000).springify()}
                        className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={'gray'}
                            value={formBody?.password}
                            onChangeText={value => handleInputChange('password', value)}
                            secureTextEntry
                        />
                    </Animated.View>

                    <Animated.View
                        className="w-full"
                        entering={FadeInDown.delay(400).duration(1000).springify()}>

                        <TouchableOpacity className="w-full bg-[#ec3237] p-3 rounded-2xl mb-3" onPress={loginHandler}>
                            <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}