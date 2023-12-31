import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'

export default function VehicleLogBookOutForm({ route, navigation }) {
    const routeParams = route.params;
    useEffect(() => {
        navigation.setOptions({
            title: 'Vehicle Log Book Out',
            headerTitleAlign: 'center'
        });
    }, []);

    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            <View className="mx-6 space-y-5">

                <TextInput
                    placeholder="Start KM"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />

                <TextInput
                    placeholder="From"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Battery Number"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Driver Name"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Battery Start Percentage"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Out Time"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />

                <TouchableOpacity className="w-full bg-[#ec3237] p-2 rounded-xl mt-8">
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