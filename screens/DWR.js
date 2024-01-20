import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { post } from '../utils/ApiRequest';
import { apisPath } from '../utils/path';
import { useSelector } from 'react-redux';

export default function DWR({ route, navigation }) {
    const textAreaLines = 4;
    const [loading, setLoading] = useState(false)
    const chassis_no = useSelector(state => state?.vehicleDetailReducer?.chassis_no);
    const km_reading = useSelector(state => state?.vehicleDetailReducer?.km_reading);
    const token = useSelector(state => state?.loginReducer?.token);

    const [formData, setFormData] = useState({
        km_reading: km_reading,
        snag_details: '',
        rectification_details: '',
        spares_used: '',
        spares_qty: '',
        issue_slip_no: '',
        rate: '',
        job_done_by: '',
        sup_by: '',
        air: '',
        vehicle_id: chassis_no,
    })

    useEffect(() => {
        navigation.setOptions({
            title: 'DWR',
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
        await post(apisPath?.front?.dwr, token, formData).then((res) => {
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
                    placeholder="KMS"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData?.km_reading}
                    onChangeText={e => handleInputChange('km_reading', e)}
                />

                <TextInput
                    multiline={true}
                    numberOfLines={textAreaLines}
                    placeholder="Snag Details"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.inputArea}
                    value={formData?.snag_details}
                    onChangeText={e => handleInputChange('snag_details', e)}
                />

                <TextInput
                    multiline={true}
                    numberOfLines={textAreaLines}
                    placeholder="Rectification Details"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.inputArea}
                    value={formData?.rectification_details}
                    onChangeText={e => handleInputChange('rectification_details', e)}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={textAreaLines}
                    placeholder="Spares Used"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.inputArea}
                    value={formData?.spares_used}
                    onChangeText={e => handleInputChange('spares_used', e)}
                />
                <TextInput
                    placeholder="Spares QTY"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData?.spares_qty}
                    onChangeText={e => handleInputChange('spares_qty', e)}
                />
                <TextInput
                    placeholder="Issue Slip No."
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.issue_slip_no}
                    onChangeText={e => handleInputChange('issue_slip_no', e)}
                />
                <TextInput
                    placeholder="Rate"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData?.rate}
                    onChangeText={e => handleInputChange('rate', e)}
                />
                <TextInput
                    placeholder="Job Done By"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.job_done_by}
                    onChangeText={e => handleInputChange('job_done_by', e)}
                />
                <TextInput
                    placeholder="Sup By"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.sup_by}
                    onChangeText={e => handleInputChange('sup_by', e)}
                />

                <TextInput
                    placeholder="Air"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.air}
                    onChangeText={e => handleInputChange('air', e)}
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
    inputArea: {
        paddingLeft: 6,
        paddingBottom: 8,
        fontSize: 16,
        verticalAlign: 'top'
    }
})

