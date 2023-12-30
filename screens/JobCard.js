import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from "@expo/vector-icons";


export default function JobCard({ route, navigation }) {
    const textAreaLines = 4;
    const routeParams = route.params;
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
        { name: 'Front' },
        { name: 'Rear L/H' },
        { name: 'Mat' },
        { name: 'Mud Flap' },
        { name: 'Wiper' },
        { name: 'Battery No./Make' },
        { name: 'Fire Ext.' },
        { name: 'In' },
        { name: 'Out' },
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
                            <TableTr key={index} name={tr?.name} />
                        )
                    })}
                </View>


                <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-10 mb-8">
                    <Text className="text-xl font-bold text-white text-center">Submit</Text>
                </TouchableOpacity>
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

const TableTr = ({ name }) => {
    return (
        <View style={styles.tableTr}>
            <View className="border-y border-l" style={styles.tableTrText}><Text style={{ fontSize: 17, fontWeight: 500 }}>{name}</Text></View>
            <TextInput className="border" selectionColor={'#ec3237'} style={[styles.tableTrText1]} />
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
    }
})