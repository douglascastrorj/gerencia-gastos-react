/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import logoImage from '../../assets/img1.jpg';

import LoadTabs from '../../screens';
import { signUp, signIn, autoSignIn } from '../../utils/firebase';
import { setTokens, getTokens } from '../../utils/localStorage';

export default class LoginComponent extends Component {

    state = {
        email: '',
        password: '',
        loading: true
    }

    register = (email, password) => {
        const result = signUp({ email, password });
        console.log(result)
    }


    componentDidMount() {
        getTokens((values) => {
            if (values[0][1] === null) {
                this.setState({ loading: false })
            } else {
                autoSignIn(values[1][1]).then((userData) => {


                    // alert(JSON.stringify(userData))
                    if (!userData.token) {
                        this.setState({ loading: false })
                    } else {
                        setTokens(userData, () => {
                            LoadTabs();
                        })
                    }
                })
            }
        })
    }

    login() {

        let { email, password } = this.state;

        if (!email || !password) {
            alert('Ops. Check your info')
            return;
        }
        const result = signIn({ email, password });

        result
            .then(data => {

                userData = {
                    uid: data.localId || false,
                    token: data.idToken || false,
                    refToken: data.refreshToken || false
                }

                setTokens(userData, () => {
                    console.log(userData)
                    LoadTabs();
                })

            })
            .catch(err => {
                alert('Ops. Check your info')
            })
    }

    render() {

        if (this.state.loading) {
            return (
                <View style={styles.loadingView}>
                    <View style={styles.loadingIcon}>
                        <Icon name='cogs' size={50} />
                        <Text>Carregando...</Text>
                    </View>
                    <View >
                        <ActivityIndicator
                            size={30}
                        />
                    </View>

                </View>
            )
        }
        else
            return (
                <ScrollView
                    onPress={this.dismissKeyboard}>
                    <View style={styles.container}>

                        <View style={styles.logo}>

                            <Text style={styles.logoText}>Meu Logo</Text>

                            <Image
                                style={styles.logoImage}
                                source={logoImage}
                                resizeMode='contain'
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={(email) => this.setState({ email })}
                                keyboardType={'email-address'}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                                onChangeText={(password) => this.setState({ password })}
                            />

                            <Button title="Login" onPress={() => { this.login(this.state.email, this.state.password) }} />

                        </View>
                    </View>
                </ScrollView>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20
    },

    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10
    },

    loadingIcon: { 
        alignItems: 'center', 
        marginBottom: 20 
    },

    logo: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,

    },
    logoImage: {
        width: 120,
        height: 120
    },
    logoText: {
        fontSize: 40,
        fontFamily: 'Roboto-Black',
        color: '#555555',
        marginBottom: 20,
    },
    text2: {
        fontSize: 40,
        fontFamily: 'RobotoCondensed-Regular',
        color: '#00ADA9'
    },
    inputWrapper: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
        padding: 20
    },
    input: {
        padding: 5,
        borderBottomColor: '#00ADA9',
        borderBottomWidth: 1,
        // width: 300,
        marginBottom: 20
    }

});
