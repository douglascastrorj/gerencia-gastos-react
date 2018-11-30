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

        const data = [1500, 1300, 700, 1033, 800, 1000]

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
                    formatLabel={value => `R$ ${value}`}
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
        const labels = ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        return (

            <View style={{flex:1, width: '100%', padding: 10 }}>
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                        {this.renderBars()}
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.chartTitle}>
                            Gasto Médio do Período
                        </Text>
                        {this.renderLines()}
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
