/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import { getGastos } from '../../utils/firebase';
import { getTokens } from '../../utils/localStorage';

import PieChartComponent from '../Graficos/Piechart';
import BarChartComponent from '../Graficos/Barchart';
import LineChartComponent from '../Graficos/Linechart';

import { extrairDadosELabels, agruparGastosPorMes, agruparGastosPorCategoria } from '../../utils/misc';

import { Navigation } from 'react-native-navigation';
import { navigatorDeepLink } from '../../screens/links';

export default class HelloComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gastos: [],
            pieChart: {},
            refreshing: true
        }

        this.props.navigator.setOnNavigatorEvent((event) => {
            navigatorDeepLink(event, this);
        })

    }


    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true })
        getTokens((tokens) => {
            getGastos(tokens[3][1])
                .then(gastos => {
                    let pieChart = extrairDadosELabels(gastos, agruparGastosPorCategoria);

                    let barChart = extrairDadosELabels(gastos, agruparGastosPorMes);

                    this.setState({ gastos, pieChart, barChart, refreshing: false });
                })
        })
    }

    renderCharts() {

        return this.state.refreshing ? null 
        :
        (
            <View>

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
                    <BarChartComponent
                        data={this.state.barChart.values}
                        labels={this.state.barChart.labels}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.chartTitle}>
                        Gasto Médio do Período
                        </Text>
                    {/* {this.renderLines()} */}
                    <LineChartComponent />
                </View>
            </View>
        )
    }


    render() {

        return (

            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >

                {this.renderCharts()}

            </ ScrollView>

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
