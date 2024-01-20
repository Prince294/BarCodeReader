import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { post } from '../utils/ApiRequest';
import { apisPath } from '../utils/path';
import Loader from './Loader';
import { useSelector } from 'react-redux';

export default function VehicleLogBookOutForm({ route, navigation }) {
    const [loading, setLoading] = useState(false)
    const chassis_no = useSelector(state => state?.vehicleDetailReducer?.chassis_no);
    const km_reading = useSelector(state => state?.vehicleDetailReducer?.km_reading);
    const token = useSelector(state => state?.loginReducer?.token);

    const [formData, setFormData] = useState({
        start_km: '',
        place_from: '',
        out_time: '',
        driver_name: '',
        battery_start_per: '',
        battery_no: '',
        vehicle_id: chassis_no,
        token: token,
    })

    useEffect(() => {
        navigation.setOptions({
            title: 'Vehicle Log Book Out',
            headerTitleAlign: 'center'
        });
    }, []);

    const handleInputChange = (name, val) => {
        setFormData((prev) => {
            return { ...prev, [name]: val }
        });
    }

    const submitForm = async () => {
        setLoading(true)
        await post(apisPath?.front?.vehicleLogOut, token, formData).then((res) => {
            console.log(res)
            if (res?.success) {
                setLoading(false)
                // navigation.navigate('FormsDashboard', { data: data, type: type, username: routeParams.username })
            }
            else {
                setLoading(false)
                Alert.alert(`Error: ${res?.message}`)
            }
        })
    }

    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            {loading && <Loader />}
            <View className="mx-6 space-y-5">

                <TextInput
                    placeholder="Start KM"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.start_km}
                    onChangeText={e => handleInputChange('start_km', e)}
                />

                <TextInput
                    placeholder="From"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.place_from}
                    onChangeText={e => handleInputChange('place_from', e)}
                />

                <TextInput
                    placeholder="Battery Number"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.battery_no}
                    onChangeText={e => handleInputChange('battery_no', e)}
                />
                <TextInput
                    placeholder="Driver Name"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.driver_name}
                    onChangeText={e => handleInputChange('driver_name', e)}
                />
                <TextInput
                    placeholder="Battery Start Percentage"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.battery_start_per}
                    onChangeText={e => handleInputChange('battery_start_per', e)}
                />
                <TextInput
                    placeholder="Out Time"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.out_time}
                    onChangeText={e => handleInputChange('out_time', e)}
                />

                <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8" onPress={submitForm}>
                    <Text className="text-xl font-bold text-white text-center">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingLeft: 6,
        paddingBottom: 8,
        fontSize: 16,
    },
})