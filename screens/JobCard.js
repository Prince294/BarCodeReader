import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";


export default function JobCard({ route, navigation }) {
    const textAreaLines = 4;
    const routeParams = route.params;

    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [calanderOpen, setCalanderOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [calanderIndex, setCalanderIndex] = useState(-1)


    const [formData, setFormData] = useState({
        chassisNo: '',
        mileage: '',
        toolkit: false,
        serviceBook: false,
        ownerBook: false,
    })

    const [singleCheck, setSingleCheck] = useState([
        { name: 'Toolkit', val: false },
        { name: 'Service Book', val: false },
        { name: "Owner's Book", val: false },
    ])
    const [rhlh, setRhlh] = useState([
        { name: 'Mirror', rh: false, lh: false },
        { name: 'H/L Blub', rh: false, lh: false },
        { name: 'I/L Blub', rh: false, lh: false },
        { name: 'T/L Blub', rh: false, lh: false },
        { name: 'R/L Blub', rh: false, lh: false },
    ])

    const [table, setTable] = useState([
        { name: 'Front', type: '', value: '' },
        { name: 'Rear L/H', type: '', value: '' },
        { name: 'Mat', type: '', value: '' },
        { name: 'Mud Flap', type: '', value: '' },
        { name: 'Wiper', type: '', value: '' },
        { name: 'Battery No./Make', type: '', value: '' },
        { name: 'Fire Ext.', type: '', value: '' },
        { name: 'In', type: 'date', value: '' },
        { name: 'Out', type: 'date', value: '' },
    ])

    useEffect(() => {
        navigation.setOptions({
            title: 'Job Card',
            headerTitleAlign: 'center'
        });
    }, []);


    const handleInputChange = (name, val) => {
        setFormData((prev) => {
            return { ...prev, [name]: val }
        });
    }

    const handleRHLH = (index, name) => {
        let data = [...rhlh];
        data[index][name] = !data[index][name];
        setRhlh(data);
    }

    const handleSingleCheck = (index) => {
        let data = [...singleCheck];
        data[index]['val'] = !data[index]?.val;
        setSingleCheck(data);
    }

    const handleCalanderClick = (index) => {
        setCalanderIndex(index);
        setSelectedDate(table[index]?.value);
        setCalanderOpen(prev => !prev);
    }

    const handleCalanderSelection = (date) => {
        setSelectedDate(date);
        let data = table;
        data[calanderIndex]['value'] = date;
        setTable(data);
        setCalanderOpen(prev => !prev);
    }

    return (
        <ScrollView className="h-full w-full flex p-3">
            <View className="space-y-2 pb-4">

                <View className="border p-2">
                    <TextInput
                        placeholder="Chassis No."
                        placeholderTextColor={'gray'}
                        selectionColor={'#ec3237'}
                        underlineColorAndroid={'#000'}
                        style={styles.input}
                        value={formData?.chassisNo}
                        onChangeText={e => handleInputChange('chassisNo', e)}
                    />

                    <TextInput
                        placeholder="Mileage/K.M. Reading"
                        placeholderTextColor={'gray'}
                        selectionColor={'#ec3237'}
                        underlineColorAndroid={'#000'}
                        style={styles.input}
                        value={formData?.mileage}
                        onChangeText={e => handleInputChange('mileage', e)}
                    />
                </View>

                <View className="border p-2">
                    <View className="bg-black py-2.5 rounded-md mb-5">
                        <Text className="text-center text-base text-white">Checklist Point</Text>
                    </View>


                    {singleCheck?.map((item, index) => {
                        return (
                            <View style={styles.checkBoxButtonsView} className="my-1" key={index}>
                                <View style={styles.checkBoxButtonsContainer}>
                                    <CheckBoxButton name={item?.name} checked={item?.val} handleCheckBox={() => handleSingleCheck(index)} />
                                </View>
                            </View>
                        )
                    })}

                    {rhlh?.map((item, index) => {
                        return (
                            <View style={styles.checkBoxButtonsView1} className="my-1.5" key={index}>
                                <Text className="ml-2" style={{ fontSize: 18, fontWeight: 500 }}>{item?.name}</Text>

                                <View style={styles.checkBoxButtonsContainer1}>
                                    <CheckBoxButton name={'R/H'} checked={item?.rh} handleCheckBox={() => handleRHLH(index, 'rh')} />
                                    <CheckBoxButton name={'L/H'} checked={item?.lh} handleCheckBox={() => handleRHLH(index, 'lh')} />
                                </View>
                            </View>
                        )
                    })}
                </View>


                <View className="border p-2">
                    {table?.map((tr, index) => {
                        return (
                            <TableTr key={index} name={tr?.name} type={tr?.type} handleCalanderClick={() => handleCalanderClick(index)} value={tr?.value} />
                        )
                    })}
                </View>


                <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-10 mb-8">
                    <Text className="text-xl font-bold text-white text-center">Submit</Text>
                </TouchableOpacity>


                <Modal transparent={true} visible={calanderOpen}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <AntDesign name="closecircle" size={24} color="black" onPress={() => {
                                setCalanderOpen(false)
                            }} style={{ marginLeft: 'auto', marginBottom: 10 }} />
                            <DatePicker
                                current={currentDate}
                                selected={selectedDate}
                                onDateChange={(date) => {
                                    handleCalanderSelection(date)
                                }}
                                mode="calendar"
                                style={{ borderRadius: 10 }}
                            />
                        </View>
                    </View>
                </Modal>

            </View>
        </ScrollView>
    )
}

const CheckBoxButton = ({ name, checked, handleCheckBox }) => {
    return (
        <TouchableOpacity style={styles.checkBoxButtonContainer} onPress={handleCheckBox}>
            <View style={[styles.checkBoxButton, { borderColor: checked ? 'green' : 'black' }]} >
                {checked ?
                    <AntDesign name="check" size={14} color={"green"} style={{ fontWeight: 900 }} />
                    :
                    null
                }

            </View>
            <Text style={{ fontSize: 15 }}>{name}</Text>
        </TouchableOpacity>)
}

const TableTr = ({ name, type, handleCalanderClick, value }) => {
    return (
        <View style={styles.tableTr}>
            <View className="border-y border-l" style={styles.tableTrText}><Text style={{ fontSize: 17, fontWeight: 500 }}>{name}</Text></View>


            {type === 'date' ?
                <View style={styles.calanderView}>
                    <TextInput
                        selectionColor={'#ec3237'}
                        style={[styles.tableTrText1, { color: 'black' }]}
                        value={value}
                        editable={false}
                        className="border"
                    />
                    <TouchableOpacity style={styles.calanderIcon} onPress={handleCalanderClick}>
                        <MaterialIcons name="date-range" size={25} />
                    </TouchableOpacity>
                </View>
                :
                <TextInput className="border" selectionColor={'#ec3237'} style={[styles.tableTrText1]} />}
        </View>
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
    checkBoxButtonsView: {
        rowGap: 10,
        paddingLeft: 4,
        paddingBottom: 8,
    },
    checkBoxButtonsView1: {
        flexDirection: 'row',
        flex: 1
    },
    checkBoxButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 20
    },
    checkBoxButtonsContainer1: {
        flexDirection: 'row',
        columnGap: 24,
        marginLeft: 'auto',
        marginRight: 10
    },
    checkBoxButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6
    },
    checkBoxButton: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableTr: {
        flex: 1,
        flexDirection: 'row'
    },
    tableTrText: {
        width: '38%',
        padding: 5
    },
    tableTrText1: {
        flex: 1,
        paddingLeft: 7,
        fontSize: 16
    },
    calanderView: {
        flexDirection: 'row',
        flex: 1
    },
    calanderIcon: {
        position: 'absolute',
        right: 12,
        top: 3,
        zIndex: 10000
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
})