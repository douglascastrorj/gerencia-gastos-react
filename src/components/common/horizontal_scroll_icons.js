import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { purple, green } from '../../components/Graficos/colors'

class HorizontalScrollIcons extends Component {

    generateIcon = (categories) => (
        categories ? 
            categories.map( item => (
            <View style={{marginRight: 15}} key={item.title}>
                <Icon.Button
                    name={item.icon}
                    iconStyle={{marginRight:10, marginLeft:3}}
                    backgroundColor={
                        this.props.categorySelected.title !== item.title ?
                        '#C1C1C1'
                        : green//'#FF6444'
                    }
                    size={20}
                    borderRadius={100}
                    onPress={()=> this.props.updateCategoryHandler(item)}
                >
                    <Text style={{
                        color:'#ffffff',
                        marginRight: 5
                    }}>{item.title}</Text>
                </Icon.Button>
            </View>
            ))           
        :null
    )

    render(){
        return (
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.scrollContainer}>
                    {this.generateIcon(this.props.categories)}
                </View>
                
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%',
       
    }

})


export default HorizontalScrollIcons;