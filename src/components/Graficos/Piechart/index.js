

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

import { colors } from '../colors';

// const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

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