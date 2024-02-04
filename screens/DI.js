import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { apisPath } from '../utils/path';
import { post } from '../utils/ApiRequest';

export default function DI({ route, navigation }) {
    const textAreaLines = 4;
    const [loading, setLoading] = useState(false)
    const chassis_no = useSelector(state => state?.VehicleDetailReducer?.chassis_no);
    const vehicle_id = useSelector(state => state?.VehicleDetailReducer?.vehicle_id);
    const km_reading = useSelector(state => state?.VehicleDetailReducer?.km_reading);
    const token = useSelector(state => state?.LoginReducer?.token);

    const [formData, setFormData] = useState({
        brakeFluid: false,
        brakeFluidRemark: '',
        oilLevel: false,
        oilLevelRemark: '',
        steeringFunction: false,
        steeringFunctionRemark: '',
        allLight: false,
        allLightRemark: '',
        parkingBrake: false,
        parkingBrakeRemark: '',
        tranaxleOil: false,
        tranaxleOilRemark: '',
        tyrePressure: false,
        tyrePressureRemark: '',
        physicalInspection: false,
        physicalInspectionRemark: '',
        odoMeterReading: '',
        allFastners: '',
        remark: '',
    })

    useEffect(() => {
        navigation.setOptions({
            title: 'DI',
            headerTitleAlign: 'center'
        });
    }, []);

    const handleInputChange = (name, val) => {
        setFormData((prev) => {
            return { ...prev, [name]: val }
        });
    }

    const handleRadioButton = (name) => {
        setFormData((prev) => {
            return { ...prev, [name]: !formData[name] }
        });
    }

    const submitForm = async () => {
        setLoading(true);
        let form = {
            km_reading: km_reading,
            break_fluid_level: formData?.brakeFluid,
            break_fluid_remark: formData?.brakeFluidRemark,
            hyd_oil_level: formData?.oilLevel,
            hyd_oil_remark: formData?.oilLevelRemark,
            steering_function: formData?.steeringFunction,
            steering_function_remark: formData?.steeringFunctionRemark,
            all_lights: formData?.allLight,
            all_lights_remark: formData?.allLightRemark,
            parking_brake: formData?.parkingBrake,
            parking_brake_remark: formData?.parkingBrakeRemark,
            tranaxle_oil_level: formData?.tranaxleOil,
            tranaxle_oil_remark: formData?.tranaxleOilRemark,
            tyre_pressure: formData?.tyrePressure,
            tyre_pressure_remark: formData?.tyrePressureRemark,
            physical_inspection: formData?.physicalInspection,
            physical_inspection_remark: formData?.physicalInspectionRemark,
            all_fastners: formData?.allFastners,
            remark: formData?.remark,
            vehicle_id: vehicle_id,
            token: token
        }

        var form_data = new FormData();
        for (var key in form) {
            form_data.append(key, form[key]);
        }

        await post(apisPath?.front?.di, form_data).then((res) => {
            if (res?.success) {
                setLoading(false);
                navigation.navigate('FormsDashboard')
            }
            else {
                setLoading(false);
                Alert.alert(`Error: ${res?.message}`)
            }
        })
    }

    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            {loading && <Loader />}
            <View className="mx-6 space-y-5 pb-12">

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
                    placeholder="ODO Meter Reading"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                    value={formData?.odoMeterReading}
                    onChangeText={e => handleInputChange('odoMeterReading', e)}
                />


                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Brake fluid level / Leakage</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.brakeFluid} handleRadioButton={() => handleRadioButton('brakeFluid')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.brakeFluid} handleRadioButton={() => handleRadioButton('brakeFluid')} />

                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.brakeFluidRemark}
                            onChangeText={e => handleInputChange('brakeFluidRemark', e)}
                        />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Hyd. Oil level / Leakage</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.oilLevel} handleRadioButton={() => handleRadioButton('oilLevel')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.oilLevel} handleRadioButton={() => handleRadioButton('oilLevel')} />
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.oilLevelRemark}
                            onChangeText={e => handleInputChange('oilLevelRemark', e)}
                        />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Steering function</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.steeringFunction} handleRadioButton={() => handleRadioButton('steeringFunction')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.steeringFunction} handleRadioButton={() => handleRadioButton('steeringFunction')} />
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.steeringFunctionRemark}
                            onChangeText={e => handleInputChange('steeringFunctionRemark', e)}
                        />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>All lights / Other electrial connection</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.allLight} handleRadioButton={() => handleRadioButton('allLight')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.allLight} handleRadioButton={() => handleRadioButton('allLight')} />
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.allLightRemark}
                            onChangeText={e => handleInputChange('allLightRemark', e)}
                        />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Parking brake</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.parkingBrake} handleRadioButton={() => handleRadioButton('parkingBrake')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.parkingBrake} handleRadioButton={() => handleRadioButton('parkingBrake')} />
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.parkingBrakeRemark}
                            onChangeText={e => handleInputChange('parkingBrakeRemark', e)}
                        />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Tranaxle oil level / Leakage</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.tranaxleOil} handleRadioButton={() => handleRadioButton('tranaxleOil')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.tranaxleOil} handleRadioButton={() => handleRadioButton('tranaxleOil')} />
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.tranaxleOilRemark}
                            onChangeText={e => handleInputChange('tranaxleOilRemark', e)}
                        />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Tyre pressure / Conditions</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.tyrePressure} handleRadioButton={() => handleRadioButton('tyrePressure')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.tyrePressure} handleRadioButton={() => handleRadioButton('tyrePressure')} />
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.tyrePressureRemark}
                            onChangeText={e => handleInputChange('tyrePressureRemark', e)}
                        />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Physical Inspection</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.physicalInspection} handleRadioButton={() => handleRadioButton('physicalInspection')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.physicalInspection} handleRadioButton={() => handleRadioButton('physicalInspection')} />
                        <TextInput
                            placeholder="Type here..."
                            placeholderTextColor={'gray'}
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input1}
                            value={formData?.physicalInspectionRemark}
                            onChangeText={e => handleInputChange('physicalInspectionRemark', e)}
                        />
                    </View>
                </View>




                <TextInput
                    placeholder="All fastners"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    value={formData?.allFastners}
                    onChangeText={e => handleInputChange('allFastners', e)}
                />

                <TextInput
                    multiline={true}
                    numberOfLines={textAreaLines}
                    placeholder="Remark"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.inputArea}
                    value={formData?.remark}
                    onChangeText={e => handleInputChange('remark', e)}
                />

                <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8 mb-8" onPress={submitForm}>
                    <Text className="text-xl font-bold text-white text-center">Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const RadioButton = ({ name, checked, handleRadioButton }) => {
    return (
        <TouchableOpacity style={styles.radioButtonContainer} onPress={handleRadioButton}>
            <View style={styles.radioButton} >
                {checked ?
                    <View style={{
                        height: 8,
                        width: 8,
                        borderRadius: 6,
                        backgroundColor: '#000',
                    }} />
                    :
                    null
                }

            </View>
            <Text style={{ fontSize: 15 }}>{name}</Text>
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingLeft: 6,
        paddingBottom: 8,
        fontSize: 16,
    },
    input1: {
        flex: 1,
        paddingLeft: 8,
        paddingBottom: 7,
        fontSize: 14
    },
    inputArea: {
        paddingLeft: 6,
        paddingBottom: 8,
        fontSize: 16,
        verticalAlign: 'top'
    },
    radioButtonsView: {
        rowGap: 10,
        paddingLeft: 4,
        paddingBottom: 8,
    },
    radioButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 20
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6
    },
    radioButton: {
        width: 16,
        height: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    }
})