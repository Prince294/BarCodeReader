import { Alert } from 'react-native';
import * as Url from './path';


export const post = (url, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: body,
            });

            if (response !== null) {
                let res = await response?.json();
                if (res?.success) {
                    Alert.alert(res?.message)
                }
                resolve(res);
            }
        } catch (err) {
            console.error('Error on POST Method-', err?.message);
            Alert.alert('Error on POST Method-' + err?.message)
        }
    })

};


