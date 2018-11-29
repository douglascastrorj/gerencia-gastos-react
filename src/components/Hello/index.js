/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getGastos } from '../../utils/firebase';
import { getTokens } from '../../utils/localStorage';

export default class HelloComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        this.setState({
            message: `Hello amigo`
        })

        getTokens( (tokens)=> {
            getGastos(tokens[3][1]);
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.helloMessage}>{this.state.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        padding:10

    },
    helloMessage: {
        color: '#fff'
    }
});
