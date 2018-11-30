/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';

import { getGastos } from '../../utils/firebase';
import { getTokens } from '../../utils/localStorage';

import { AreaChart, Grid, PieChart, YAxis, XAxis, LineChart, BarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import PieChartComponent from '../Graficos/Piechart';
import BarChartComponent from '../Graficos/Barchart';
import LineChartComponent from '../Graficos/Linechart';

import { extrairDadosELabels } from '../../utils/misc'

export default class HelloComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gastos: [],
            pieChart: {},
            loading: true
        }
    }

    componentDidMount() {

        getTokens((tokens) => {
            getGastos(tokens[3][1])
                .then(gastos => {
                    let pieChart = extrairDadosELabels(gastos)
                    this.setState({ gastos, pieChart, loading: false })
                })
        })
    }



    render() {

        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        size={50}
                    />
                    <Text> Carregando...</Text>
                </View>
            )
        }
        else
            return (

                <ScrollView style={styles.container}>

                    <View style={styles.content}>
                        <Text style={styles.chartTitle}>
                            Gasto Geral por categoria
                        </Text>
                        <PieChartComponent
                            data={this.state.pieChart.values}
                            labels={this.state.pieChart.labels}
                        />
                    </View>



                    <View style={styles.content} >
                        <Text style={styles.chartTitle}>
                            Gasto dos Últimos Meses
                        </Text>
                        <BarChartComponent />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.chartTitle}>
                            Gasto Médio do Período
                        </Text>
                        {/* {this.renderLines()} */}
                        <LineChartComponent />
                    </View>      

                </ScrollView>

            )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    chartTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        marginBottom: 15,
    }
});
