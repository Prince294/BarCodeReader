import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function DI({ route, navigation }) {
    const textAreaLines = 4;
    const routeParams = route.params;

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
        tranaxleOil: false,
        tyrePressure: false,
        physicalInspection: false,
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

    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            <View className="mx-6 space-y-5 pb-12">

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
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Tranaxle oil level / Leakage</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.tranaxleOil} handleRadioButton={() => handleRadioButton('tranaxleOil')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.tranaxleOil} handleRadioButton={() => handleRadioButton('tranaxleOil')} />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Tyre pressure / Conditions</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.tyrePressure} handleRadioButton={() => handleRadioButton('tyrePressure')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.tyrePressure} handleRadioButton={() => handleRadioButton('tyrePressure')} />
                    </View>
                </View>

                <View style={styles.radioButtonsView}>
                    <Text style={{ fontSize: 17.5, fontWeight: 500 }}>Physical Inspection</Text>
                    <View style={styles.radioButtonsContainer}>
                        <RadioButton name={"Ok"} checked={formData?.physicalInspection} handleRadioButton={() => handleRadioButton('physicalInspection')} />
                        <RadioButton name={"Not Ok"} checked={!formData?.physicalInspection} handleRadioButton={() => handleRadioButton('physicalInspection')} />
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

                <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8 mb-8">
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