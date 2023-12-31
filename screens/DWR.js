import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';

export default function DWR({ route, navigation }) {
    const textAreaLines = 4;
    const routeParams = route.params;
    useEffect(() => {
        navigation.setOptions({
            title: 'DWR',
            headerTitleAlign: 'center'
        });
    }, []);


    return (
        <ScrollView className="h-full w-full flex pt-10 pb-10">
            <View className="mx-6 space-y-5">

                <TextInput
                    placeholder="KMS"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                />

                <TextInput
                    multiline={true}
                    numberOfLines={textAreaLines}
                    placeholder="Snag Details"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.inputArea}
                />

                <TextInput
                    multiline={true}
                    numberOfLines={textAreaLines}
                    placeholder="Rectification Details"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.inputArea}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={textAreaLines}
                    placeholder="Spares Used"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.inputArea}
                />
                <TextInput
                    placeholder="Spares QTY"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Issue Slip No."
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Rate"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Job Done By"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Sup By"
                    placeholderTextColor={'gray'}
                    selectionColor={'#ec3237'}
                    underlineColorAndroid={'#000'}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Air"
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
    inputArea: {
        paddingLeft: 6,
        paddingBottom: 8,
        fontSize: 16,
        verticalAlign: 'top'
    }
})

