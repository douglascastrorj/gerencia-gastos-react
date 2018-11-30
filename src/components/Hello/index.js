/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { AreaChart, Grid, PieChart, YAxis, XAxis, LineChart, BarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

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

        getTokens((tokens) => {
            getGastos(tokens[3][1]);
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
        const data = [50, 10, 40, 95]
        return (

            <View style={{borderColor: '#333', borderWidth: 1, padding: 10}}>
                <BarChart
                    style={{ height: 200 }}
                    data={data}
                    svg={{ fill }}
                    contentInset={{ top: 50, bottom: 50 }}
                >
                    <Grid />
                </BarChart>
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={ data }
                    formatLabel={ (value, index) => index }
                    contentInset={{ left: 30, right: 30 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </View>

        )
    }

    render() {

        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        return (

            <ScrollView>
                <AreaChart
                    style={{ height: 200 }}
                    data={data}
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                >
                    <Grid />
                </AreaChart>

                {this.renderPieChart()}

                {this.renderLines()}

                {this.renderBars()}
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        padding: 10

    },
    helloMessage: {
        color: '#fff'
    }
});
