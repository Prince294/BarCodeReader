import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ImageBackground } from 'react-native';

export default function FormsDashboard({ route, navigation }) {
    const routeParams = route.params;
    const [cardsData, setCardsData] = useState([
        { 'name': 'Battery Swapping', id: 1, dropdown: false },
        {
            'name': 'Vehicle Log Book', id: 2, dropdown: true, dropCards: [
                { 'name': 'Out', route: 'VehicleLogBookOutForm', routeName: 'Vehicle Out' },
                { 'name': 'In', route: 'VehicleLogBookInForm', routeName: 'Vehicle In' }
            ]
        },
        {
            'name': 'Maintenance', id: 3, dropdown: true, dropCards: [
                { 'name': 'DI', route: 'DI', routeName: 'DI' },
                { 'name': 'DWR', route: 'DWR', routeName: 'DWR' },
                { 'name': 'BreakDown', route: 'BreakDown', routeName: 'BreakDown' },
                { 'name': 'JobCard', route: 'JobCard', routeName: 'JobCard' }
            ]
        },
        { 'name': 'Security', id: 4, dropdown: false }
    ]);

    useEffect(() => {
        navigation.setOptions({
            title: 'Home',
            headerTitleAlign: 'center'
        });
    }, []);




    return (
        <ScrollView className="bg-[#ec323722] h-full w-full pt-4">
            {cardsData?.map((card, index) => {
                return (!card?.dropdown ?
                    <TouchableOpacity key={index} style={[styles.card, index + 1 === cardsData.length && { marginBottom: 100 }]} className="shadow-2xl shadow-slate-900">
                        <ImageBackground style={[styles.imageBackground, styles.padding]} source={require('../assets/forms/card_bg2.jpg')} >
                            <Text className="text-[23px] font-bold text-black font-bold">{card?.name}</Text>
                            <AntDesign name="rightcircle" size={28} />
                        </ImageBackground>
                    </TouchableOpacity>
                    :
                    <View key={index} style={[styles.card, styles.card1, styles.padding1, index + 1 === cardsData.length && { marginBottom: 100 }]} className="bg-[#f2f2ce] shadow-xl shadow-slate-900 ">
                        <Text className="text-[23px] font-bold text-black font-bold">{card?.name}</Text>
                        <View className="flex flex-row justify-between flex-wrap gap-y-4 mt-1">
                            {card?.dropCards?.map((dropCard, dropIndex) => {
                                return <TouchableOpacity key={dropIndex} className="w-[48%] bg-slate-100 p-4 rounded-xl shadow-lg shadow-black flex-row justify-between overflow-hidden" onPress={() => navigation?.navigate(dropCard?.route, { name: dropCard?.routeName })}>
                                    <Text className="text-[18px] font-bold text-black font-black">{dropCard?.name}</Text>
                                    <AntDesign name="rightcircle" size={20} />
                                </TouchableOpacity>
                            })}
                        </View>
                    </View>)
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 18,
        borderRadius: 20,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden'
    },
    card1: {
        flexDirection: 'column',
        backgroundColor: '#f0f0d5'
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    padding: {
        paddingHorizontal: 20,
        paddingVertical: 36,
    },
    padding1: {
        paddingHorizontal: 20,
        paddingVertical: 26,
    }
});
