/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Keyboard, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeComponent extends Component {



    constructor(props) {
        super(props);
    }

    componentDidMount() {
        state = {
            email: '',
            password: ''
        }
    }


    render() {
        return (
            <ScrollView
                onPress={this.dismissKeyboard}>
                <View style={styles.container}>

                    <View style={{ flex: 1, marginTop: 20, borderTopColor: '#aaa', borderTopWidth: 1, padding: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Black' }}> Icones para tipos de gasto </Text>
                        </View>

                        <Text>
                            <Icon name="plane" size={30} color="#3b5998" /> Viagens
                            </Text>

                        <Text>
                            <Icon name="bus" size={30} color="#3b5998" />    Transporte
                            </Text>

                        <Text>
                            <Icon name="money" size={30} color="#3b5998" />   Contas
                            </Text>

                        <Text>
                            <Icon name="shopping-cart" size={30} color="#3b5998" />   Compras
                            </Text>

                        <Text>
                            <Icon name="gamepad" size={30} color="#3b5998" />   Lazer
                            </Text>

                        <Text>
                            <Icon name="graduation-cap" size={30} color="#3b5998" />   Educação
                        </Text>
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
