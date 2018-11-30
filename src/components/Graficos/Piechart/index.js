

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AreaChart, Grid, PieChart, YAxis, XAxis, LineChart, BarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


// const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)


const colors = [
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(75, 192, 192, 0.9)',
    'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)'
]
let lastColorIndex = 0;

const randomColor = () => {
    // let index = Math.floor(Math.random() * colors.length);
    return colors[lastColorIndex++ % colors.length];
}

const Labels = (props) => {

    return (
        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
            {props.labels.map((label, index) =>
                <View
                    key={`label-${label}`}
                    style={{
                        backgroundColor: props.pieData[index].svg.fill,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        margin: 5

                    }}>
                    <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>{label}</Text>
                </View>
            )}
        </View>
    )
}

const PieChartComponent = (props) => {

    const pieData = props.data
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '70%' }}>
                <PieChart
                    style={{ height: 200 }}
                    data={pieData}
                />
            </View>

            <View>
                <Labels
                    labels={props.labels}
                    pieData={pieData}
                />
            </View>

        </View>

    )
}

export default PieChartComponent;