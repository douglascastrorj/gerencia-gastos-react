

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Grid, XAxis, BarChart } from 'react-native-svg-charts';

import { green } from '../colors';

const BarChartComponent = (props) => {

    const fill = green;
    // const data = [50, 10, 40, 95, 123, 40]
    // const labels = ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    return (

        <View style={{ flex: 1, width: '100%', padding: 10 }}>
            <BarChart
                style={{ height: 200 }}
                data={props.data}
                svg={{ fill }}
                contentInset={{ top: 10, bottom: 10 }}
            >
                <Grid />
            </BarChart>
            <XAxis
                style={{ marginHorizontal: -10, marginVertical: 10 }}
                data={props.data}
                formatLabel={(value, index) => props.labels[index]}
                contentInset={{ top: 10, bottom: 10, left: 40, right: 40 }}
                // spacingInner={0.05}
                svg={{ fontSize: 10, fill: 'black' }}
            />
        </View>

    )
}

export default BarChartComponent;