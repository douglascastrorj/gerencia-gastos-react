

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Grid, YAxis, XAxis, LineChart } from 'react-native-svg-charts';

import { Meses, agruparGastosPorMes } from '../../../utils/misc'

const LineChartComponent = (props) => {

    const data = [50, 10, 40, 95, 4, 24]

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30

    // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
    // All react-native-svg-charts components support full flexbox and therefore all
    // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
    // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
    // and then displace the other axis with just as many pixels. Simple but manual.

    return (
        <View style={{ height: 200, padding: 10, flexDirection: 'row' }}>
            <YAxis
                data={data}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={data}
                    contentInset={verticalContentInset}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                >
                    <Grid />
                </LineChart>
                {/* <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={data}
                    formatLabel={(value, index) => Meses[index]}
                    spacingInner={0}
                    spacingOuter={0}
                    svg={axesSvg}
                /> */}
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data}
                    formatLabel={(value, index) => Meses[index]}
                    contentInset={{ left: 20, right: 20 }}
                    // spacingInner={0.05}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </View>
        </View>
    )
}


export default LineChartComponent;