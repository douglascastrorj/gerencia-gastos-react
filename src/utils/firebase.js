
import axios from 'axios';

import {
    REGISTER_USER,
    SIGN_USER,
    AUTO_SIGN_IN
} from './types';


export const firebaseConfig = {
    apiKey: "AIzaSyB4KOtU066yylaqQpC9K0h1XnF77q7IE9Y",
    authDomain: "app-economia.firebaseapp.com",
    databaseURL: "https://app-economia.firebaseio.com",
    projectId: "app-economia",
    storageBucket: "app-economia.appspot.com",
    messagingSenderId: "408478122571"
};

const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${firebaseConfig.apiKey}`
const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${firebaseConfig.apiKey}`
const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`

export function signIn(data) {

    const request = axios({
        method: "POST",
        url: SIGNIN,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "aplication/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return false;
    })

    // return {
    //     type: SIGN_USER,
    //     payload: request
    // }
    return request;
}

export function signUp(data) {

    const request = axios({
        method: "POST",
        url: SIGNUP,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "aplication/json"
        }
    }).then(response => {
        return response.data
    }).catch(e => {
        return e;
    })

    // return {
    //     type: REGISTER_USER,
    //     payload: request
    // }

    return request;

}

export function autoSignIn(refToken) {
    const request = axios({
        method: "POST",
        url: REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + refToken,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {

        let data = response.data;

        let userData = {
            uid:data.user_id || false,
            token: data.id_token || false,
            refToken: data.refresh_token || false
        }

        return userData;
    }).catch(e => {
        return false
    })

    // return {
    //     type: AUTO_SIGN_IN,
    //     payload: request
    // }
    return request;
}


export function addGasto(gasto) {

    const date = new Date();
    gasto = {...gasto, date};

    const request = axios({
        method: "POST",
        url: `${firebaseConfig.databaseURL}/gastos.json`,
        data: gasto,
        headers: {
            "Content-Type": "aplication/json"
        }
    }).then(response => {
        console.log(response)
        return response.data
    }).catch(e => {
        console.log(e)
        return false
    })

    // return {
    //     type: AUTO_SIGN_IN,
    //     payload: request
    // }
    return request;

}

export function getGastos(uid){

    let URL = `${firebaseConfig.databaseURL}/gastos.json`;
    URL = `${URL}/?orderBy=\"uid\"&equalTo=\"${uid}\"`;

    const request = axios({
        method: "GET",
        url: URL,
        headers: {
            "Content-Type": "aplication/json"
        }
    }).then(response => {
        const gastos = [];
        for(let key in response.data){
            gastos.push({
                ...response.data[key],
                id: key
            })
        }

        console.log(gastos)

        return gastos;
    }).catch(e => {
        console.log(e)
        return false
    })

    return request;
}