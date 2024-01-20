import { Alert } from 'react-native';
import * as Url from './path';


export const post = (url, token = '', body) => {
    return new Promise(async (resolve, reject) => {
        try {
            var headers;
            if (token == '' || token == null || token == undefined) {
                headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                };
            } else {
                headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    accesstoken: token,
                };
            }

            let data = JSON.stringify(body);
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: data,
            });

            if (response !== null) {
                let res = await response?.json();
                resolve(res);
            }
        } catch (err) {
            console.error('Error on POST Method-', err?.message);
        }
    })

};


