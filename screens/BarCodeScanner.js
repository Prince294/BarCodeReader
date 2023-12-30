import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import QRCode from '../assets/QRCode/qr_code.gif';

export default function BarCodeScreen({ route, navigation }) {
    var navigationSubscription;
    const routeParams = route.params;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [cameraClicked, setCameraClicked] = useState(false)

    useEffect(() => {
        navigationSubscription = navigation.addListener('focus', () => {
            setScanned(false);
        });

        navigation.setOptions({
            title: routeParams?.username,
            headerTitleAlign: 'center'
        });
        askForCameraPermission();

        return () => navigationSubscription();
    }, []);

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        navigation.navigate('FormsDashboard', { data: data, type: type, username: routeParams.username })
        setScanned(true);
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text className="text-[26px] font-bold text-black text-center font-black">Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text className="text-[26px] font-bold text-black text-center font-black">No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }


    return (
        <View style={styles.container}>
            {cameraClicked &&
                <>
                    <View style={styles.barcodebox} >
                        {!scanned && <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{ height: 400, width: 400 }} />}
                    </View>
                    <Text className="text-[26px] font-bold text-black text-center font-black max-w-[70%]">Align QR/Bar Code within frame to scan</Text>
                </>
            }

            {!cameraClicked &&
                <View style={styles.barcodebox}>
                    <ImageBackground style={[styles.barcodebox, styles.imageBackground]} source={QRCode} >
                    </ImageBackground></View>
            }

            {!cameraClicked &&
                <View style={styles.cameraContainer}>
                    <TouchableOpacity style={styles.cameraBorder} onPress={() => setCameraClicked(true)}>
                        <Entypo name="camera" size={50} color="black" style={styles.camera} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 19, fontWeight: 600 }}>Click Here to open QR Code Scanner</Text>
                </View>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
        rowGap: 50,
        fontSize: 16,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 320,
        width: 320,
        overflow: 'hidden',
        borderRadius: 20,
        borderWidth: 1
    },
    imageBackground: {
        resizeMode: 'cover',
    },
    cameraContainer: {
        marginTop: 'auto',
        textAlign: 'center',
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 14
    },

    cameraBorder: {
        borderWidth: 2,
        paddingHorizontal: 24,
        paddingVertical: 24,
        borderRadius: 100
    }
});
