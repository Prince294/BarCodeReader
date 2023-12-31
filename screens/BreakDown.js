import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-modern-datepicker';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";


export default function BreakDown({ route, navigation }) {
    const textAreaLines = 4;
    const routeParams = route.params;
    const [calanderOpen, setCalanderOpen] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [selectedDate, setSelectedDate] = useState()

    const [dropdownData, setDropdownData] = useState([
        { label: 'Testing', value: '0' },
        { label: 'Testing1', value: '1' },
        { label: 'Testing2', value: '2' },
        { label: 'Testing3', value: '3' },

    ])

    const [formData, setFormData] = useState({
        dropdown: { value: '' },
        breakDownDate: ''
    })

    useEffect(() => {
        navigation.setOptions({
            title: 'Break Down',
            headerTitleAlign: 'center'
        });
    }, []);

    useEffect(() => {
        console.log(calanderOpen)
    }, [calanderOpen])


    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            <View className="mx-6 space-y-5 pb-12">

                <View style={styles.formItem}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        selectionColor={'#ec3237'}
                        underlineColorAndroid={'#000'}
                        style={styles.input}
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
                        value={formData?.dropdown}
                        onChange={elem => {
                            setFormData(prev => {
                                let data = { ...prev };
                                data['dropdown']['value'] = elem
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
                    />
                </View>

                <View style={styles.formItem}>
                    <Text style={styles.label}>Breakdown date</Text>
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



                <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8 mb-8">
                    <Text className="text-xl font-bold text-white text-center">Submit</Text>
                </TouchableOpacity>
            </View>

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
                                setCalanderOpen(false);
                                setSelectedDate(date);
                            }}
                            mode="calendar"
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