import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function Loader() {
    return (
        <View style={styles.parentBox}>

            <View style={styles.box}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentBox: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100000,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.35)'
    },
    box: {
        padding: 20,
        backgroundColor: 'rgb(100,100,100)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 110,
    },
})