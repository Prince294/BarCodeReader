import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { post } from '../utils/ApiRequest';
import { apisPath } from '../utils/path';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-modern-datepicker';


export default function VehicleLogBookOutForm({ route, navigation }) {
    const [calanderOpen, setCalanderOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedDate, setSelectedDate] = useState()

    const [loading, setLoading] = useState(false)
    const chassis_no = useSelector(state => state?.VehicleDetailReducer?.chassis_no);
    const vehicle_id = useSelector(state => state?.VehicleDetailReducer?.vehicle_id);
    const km_reading = useSelector(state => state?.VehicleDetailReducer?.km_reading);
    const token = useSelector(state => state?.LoginReducer?.token);

    const [formData, setFormData] = useState({
        start_km: '',
        place_from: '',
        out_time: '',
        driver_name: '',
        batter_start_per: '',
        battery_no: '',
        vehicle_id: vehicle_id,
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
        let data = { ...formData };
        data['out_time'] = selectedDate;

        var form_data = new FormData();
        for (var key in data) {
            form_data.append(key, data[key]);
        }
        await post(apisPath?.front?.vehicleLogOut, form_data).then((res) => {
            // console.log(res)
            if (res?.success) {
                setLoading(false)
                navigation.navigate('FormsDashboard')
            }
            else {
                setLoading(false)
                Alert.alert(`Error: ${res?.message}`)
            }
        })
    }

    const changeTime = (date) => {
        setCalanderOpen(false);
        setSelectedDate(date);
    }

    return (
        <>
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
                        placeholder="Start KM"
                        placeholderTextColor={'gray'}
                        selectionColor={'#ec3237'}
                        underlineColorAndroid={'#000'}
                        style={styles.input}
                        keyboardType="numeric"
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
                        keyboardType="numeric"
                        style={styles.input}
                        value={formData?.batter_start_per}
                        onChangeText={e => handleInputChange('batter_start_per', e)}
                    />

                    <View style={styles.calanderView}>

                        <TextInput
                            placeholder="Out Time"
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={selectedDate}
                        />
                        <TouchableOpacity style={styles.calanderIcon} onPress={() => setCalanderOpen(true)}>
                            <MaterialIcons name="timer" size={30} />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8" onPress={submitForm}>
                        <Text className="text-xl font-bold text-white text-center">Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal transparent={true} visible={calanderOpen}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <AntDesign name="closecircle" size={24} color="black" onPress={() => {
                            setCalanderOpen(false)
                        }} style={{ marginLeft: 'auto', marginBottom: 10 }} />
                        <DatePicker
                            onSelectedChange={(date) => {
                                changeTime(date)
                            }}
                            // mode="time"
                            minuteInterval={1}
                            style={{ borderRadius: 10 }}
                        />
                    </View>
                </View>
            </Modal>
        </>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingLeft: 6,
        paddingBottom: 8,
        fontSize: 16,
    },
    input1: {
        height: 40,
        paddingLeft: 6,
        paddingBottom: 8,
        fontSize: 16,
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },

    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        width: "90%",
        padding: 14,
        alignItems: 'center',
    },

    calanderView: {
        flexDirection: 'row'
    },
    calanderIcon: {
        position: 'absolute',
        right: 12,
        top: 0,
        zIndex: 10000
    }
})