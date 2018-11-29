import {
    AsyncStorage
} from 'react-native';

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@prototipo@token',
        '@prototipo@refreshToken',
        '@prototipo@expireToken',
        '@prototipo@uid'
    ]).then((value)=>{
        cb(value)
    })
}

export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@prototipo@token', values.token],
        ['@prototipo@refreshToken', values.refToken],
        ['@prototipo@expireToken',expiration.toString()],
        ['@prototipo@uid', values.uid]
    ]).then( response => {
        cb();
    })
}
