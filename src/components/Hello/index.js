/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

import { getGastos } from '../../utils/firebase';
import { getTokens } from '../../utils/localStorage';

import { AreaChart, Grid, PieChart, YAxis, XAxis, LineChart, BarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

import PieChartComponent from '../Graficos/Piechart';
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

    renderPieChart() {

        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        return (
            <PieChart
                style={{ height: 200 }}
                data={pieData}
            />
        )
    }

    renderLines() {

        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        const contentInset = { top: 20, bottom: 20 }
        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={value => `${value}ºC`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
        )
    }


    renderBars() {

        const fill = 'rgb(134, 65, 244)'
        const data = [50, 10, 40, 95, 123, 40]
        const labels = [ 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro','Dezembro']
        return (

            <View style={{ padding: 10 }}>
                <BarChart
                    style={{ height: 200 }}
                    data={data}
                    svg={{ fill }}
                    contentInset={{ top: 10, bottom: 10 }}
                >
                    <Grid />
                </BarChart>
                <XAxis
                    style={{ marginHorizontal: -10, marginVertical: 10 }}
                    data={data}
                    formatLabel={(value, index) => labels[index]}
                    contentInset={{ top: 10, bottom: 10, left: 40, right: 40 }}
                    // spacingInner={0.05}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </View>

        )
    }

    render() {

        if (this.state.loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <ActivityIndicator
                    size={50}
                />
                </View>
            )
        }
        else
        return (

            <ScrollView style={styles.container}>

                {/* {this.renderPieChart()} */}
                <PieChartComponent
                    data={this.state.pieChart.values}
                    labels={this.state.pieChart.labels}
                />

                {this.renderBars()}

                {this.renderLines()}

            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        padding: 10

    },
});
