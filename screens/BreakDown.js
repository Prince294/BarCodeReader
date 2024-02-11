import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-modern-datepicker';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { post } from '../utils/ApiRequest';
import { apisPath } from '../utils/path';


export default function BreakDown({ route, navigation }) {
    const textAreaLines = 4;
    const chassis_no = useSelector(state => state?.VehicleDetailReducer?.chassis_no);
    const km_reading = useSelector(state => state?.VehicleDetailReducer?.km_reading);
    const vehicle_id = useSelector(state => state?.VehicleDetailReducer?.vehicle_id);

    const [breakDownStatus, setBreakDownStatus] = useState(false);

    const token = useSelector(state => state?.LoginReducer?.token);
    const [loading, setLoading] = useState(false)
    const [calanderOpen, setCalanderOpen] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedDate, setSelectedDate] = useState()

    const [dropdownData, setDropdownData] = useState([
        { label: 'Testing', value: '0' },
        { label: 'Testing1', value: '1' },
        { label: 'Testing2', value: '2' },
        { label: 'Testing3', value: '3' },
    ])
    const [dropDownVal, setDropDownVal] = useState({ value: '' });

    const [formData, setFormData] = useState({
        km_reading: km_reading,
        location: '',
        description: '',
        type: '',
        token: token,
        vehicle_id: vehicle_id,
    })
    const [editFormData, setEditFormData] = useState({
        breakdown_ok_date: selectedDate,
        work_done_by: '',
        verify_by: '',
        vehicle_id: vehicle_id,
        token: token,
        km_reading: km_reading,
    })

    useEffect(() => {
        navigation.setOptions({
            title: 'Break Down',
            headerTitleAlign: 'center'
        });
        getData()
    }, []);

    const getData = async () => {
        var form_data = new FormData();
        form_data.append('vehicle_id', vehicle_id);

        await post(apisPath?.front?.get_breakdown, form_data).then((res) => {
            // console.log(res)
            if (res?.success) {
                setLoading(false)
                if (res?.status === 0) {
                    setBreakDownStatus(false);
                }
                else {
                    setBreakDownStatus(true);
                }
            }
            else {
                setLoading(false)
                setBreakDownStatus(false);
                Alert.alert(`Error: ${res?.message}`)
            }
        })
    }

    const submitData = async () => {
        setLoading(true)

        var form_data = new FormData();
        if (breakDownStatus) {
            for (var key in editFormData) {
                form_data.append(key, editFormData[key]);
            }
        }
        else {
            for (var key in formData) {
                form_data.append(key, formData[key]);
            }
        }

        await post(apisPath?.front?.breakdown, form_data).then((res) => {
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

    const handleEditInputChange = (name, val) => {
        setEditFormData((prev) => {
            return { ...prev, [name]: val }
        });
    }

    const handleInputChange = (name, val) => {
        setFormData((prev) => {
            return { ...prev, [name]: val }
        });
    }


    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            {breakDownStatus ?
                <View className="mx-6 space-y-5 pb-12">

                    <View style={styles.formItem}>
                        <Text style={styles.label}>Chassis Number</Text>
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
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.label}>Breakdown OK date</Text>
                        <View style={styles.calanderView}>
                            <TextInput
                                selectionColor={'#ec3237'}
                                underlineColorAndroid={'#000'}
                                style={[styles.input, { color: 'black' }]}
                                value={selectedDate}
                                editable={false}
                            />
                            <TouchableOpacity style={styles.calanderIcon} onPress={() => setCalanderOpen(true)}>
                                <MaterialIcons name="date-range" size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.label}>Work done by</Text>
                        <TextInput
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input}
                            value={editFormData?.work_done_by}
                            onChangeText={e => handleEditInputChange('work_done_by', e)}
                        />
                    </View>


                    <View style={styles.formItem}>
                        <Text style={styles.label}>Verify by</Text>
                        <TextInput
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input}
                            value={editFormData?.verify_by}
                            onChangeText={e => handleEditInputChange('verify_by', e)}
                        />
                    </View>

                    <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8 mb-8" onPress={submitData}>
                        <Text className="text-xl font-bold text-white text-center">Submit</Text>
                    </TouchableOpacity>
                </View>
                :
                <View className="mx-6 space-y-5 pb-12">

                    <View style={styles.formItem}>
                        <Text style={styles.label}>Chassis Number</Text>
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

                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input}
                            value={formData?.location}
                            onChangeText={e => handleInputChange('location', e)}
                        />

                    </View>


                    <View style={styles.formItem}>
                        <Text style={styles.label}>Type</Text>
                        <Dropdown
                            showsVerticalScrollIndicator={false}
                            data={dropdownData}
                            maxHeight={160}
                            placeholder='Select Item'
                            style={styles.dropdownCont}
                            selectedTextStyle={styles.selectedTextStyle}
                            placeholderStyle={styles.placeholderStyle}
                            valueField="value"
                            labelField="label"
                            dropdownPosition={'bottom'}
                            value={dropDownVal?.value}
                            onChange={elem => {
                                console.log(elem)
                                setDropDownVal(prev => {
                                    let data = { ...prev };
                                    data['value'] = elem
                                    return data;
                                })
                                setFormData(prev => {
                                    let data = { ...prev };
                                    data['value'] = elem?.label;
                                    return data;
                                })
                            }}
                            renderItem={item => (
                                <View style={styles.dropdownItem}>
                                    <Text style={{ color: 'black', fontSize: 16 }}>
                                        {item?.label}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            selectionColor={'#ec3237'}
                            underlineColorAndroid={'#000'}
                            style={styles.input}
                            value={formData?.description}
                            onChangeText={e => handleInputChange('description', e)}
                        />
                    </View>

                    <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8 mb-8" onPress={submitData}>
                        <Text className="text-xl font-bold text-white text-center">Submit</Text>
                    </TouchableOpacity>
                </View>
            }

            <Modal transparent={true} visible={calanderOpen}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <AntDesign name="closecircle" size={24} color="black" onPress={() => {
                            setCalanderOpen(false)
                        }} style={{ marginLeft: 'auto', marginBottom: 10 }} />
                        <DatePicker
                            current={currentDate}
                            selected={selectedDate}
                            onSelectedChange={(date) => {
                                setCalanderOpen(false);
                                setSelectedDate(date);
                            }}
                            // mode="calendar"
                            minuteInterval={1}
                            style={{ borderRadius: 10 }}
                        />
                    </View>

                </View>

            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingLeft: 10,
        paddingBottom: 8,
        fontSize: 16,
        flex: 1
    },
    input1: {
        flex: 1,
        paddingLeft: 8,
        paddingBottom: 7,
        fontSize: 14
    },
    formItem: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    label: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '500'
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
    },
    dropdownCont: {
        borderBottomWidth: 1,
        borderColor: 'black',
        borderRadius: 6
    },
    dropdownItem: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderRadius: 6
    },
    selectedTextStyle: {
        fontSize: 17,
        color: 'black',
        paddingLeft: 5
    },
    placeholderStyle: {
        fontSize: 17,
        color: 'black',
        paddingLeft: 5
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