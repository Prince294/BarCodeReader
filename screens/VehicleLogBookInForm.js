import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { post } from '../utils/ApiRequest';
import { apisPath } from '../utils/path';

export default function VehicleLogBookInForm({ route, navigation }) {
    const [loading, setLoading] = useState(false)
    const chassis_no = useSelector(state => state?.VehicleDetailReducer?.chassis_no);
    const vehicle_id = useSelector(state => state?.VehicleDetailReducer?.vehicle_id);
    const km_reading = useSelector(state => state?.VehicleDetailReducer?.km_reading);
    const token = useSelector(state => state?.LoginReducer?.token);
    const [formData, setFormData] = useState({
        end_km: '',
        place_to: '',
        in_time: '',
        batter_end_per: '',
        battery_no: '',
        vehicle_id: vehicle_id,
        token: token,
        driver_name: ''
    });

    useEffect(() => {
        navigation.setOptions({
            title: 'Vehicle Log Book In',
            headerTitleAlign: 'center'
        });
    }, []);

    const submitForm = async () => {
        setLoading(true)
        var form_data = new FormData();
        for (var key in formData) {
            form_data.append(key, formData[key]);
        }
        await post(apisPath?.front?.vehicleLogIn, form_data).then((res) => {
            // console.log(res)
            if (res?.success) {
                navigation.navigate('FormsDashboard')
                setLoading(false)
            }
            else {
                setLoading(false)
                Alert.alert(`Error: ${res?.message}`)
            }
        })
    }

    const handleInputChange = (name, val) => {
        setFormData((prev) => {
            return { ...prev, [name]: val }
        });
    }

    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            {loading && <Loader />}
            <View className="mx-6 space-y-5">

                <TextInput
                    placeholder="Chassis Number"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                    value={chassis_no}
                    editable={false}
                />

                <TextInput
                    placeholder="End KM"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData?.end_km}
                    onChangeText={e => handleInputChange('end_km', e)}
                />

                <TextInput
                    placeholder="Place (to)"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.place_to}
                    onChangeText={e => handleInputChange('place_to', e)}
                />

                <TextInput
                    placeholder="In time"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.in_time}
                    onChangeText={e => handleInputChange('in_time', e)}
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
                    placeholder="Battery End Percentage"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData?.batter_end_per}
                    onChangeText={e => handleInputChange('batter_end_per', e)}
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