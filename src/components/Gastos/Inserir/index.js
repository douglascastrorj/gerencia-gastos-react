/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { addGasto } from '../../../utils/firebase';
import { getTokens } from '../../../utils/localStorage'


export default class InserirGastosComponent extends Component {

    state = {
        description: '',
        category: '',
        value: '',

        categorySelectedIconColor: '#3b5998',
        categoryIconColor: '#1194F6',
        categories: [
            {
                title: 'Viagens',
                icon: 'plane',
            },
            {
                title: 'Transporte',
                icon: 'bus'
            },
            {
                title: 'Contas',
                icon: 'money'
            },
            {
                title: 'Compras',
                icon: 'shopping-cart'
            },
            {
                title: 'Lazer',
                icon: 'gamepad'
            },
            {
                title: 'Educação',
                icon: 'graduation-cap'
            }
        ]
    }

    getCategoryColor(category) {
        if (category.title == this.state.category) {
            return this.state.categorySelectedIconColor;
        } else {
            return this.state.categoryIconColor;
        }
    }

    selectCategory(category) {
        this.setState({ category })
    }


    renderCategories() {
        return this.state.categories.map(category => (

            <TouchableOpacity
                key={'category@' + category.title}
                onPress={() => {
                    this.selectCategory(category.title)
                }}
                style={{ width: '33%', height: 80 }}
            >
                <View style={{ padding: 10, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name={category.icon} size={30} color={this.getCategoryColor(category)} />
                        <Text>
                            {category.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        ))

    }

    submit = () => {
        let { description, category, value } = this.state;

        getTokens(tokens => {
            const uid = tokens[3][1];
            addGasto({ uid, description, category, value })
                .then(data => {
                    console.log(data)
                    alert('Dados Enviados')
                    this.setState({
                        description: '',
                        category: '',
                        value: '',
                    })

                })
                .catch(err => {
                    console.log(err)
                })
        })


    }


    render() {
        return (

            <ScrollView>
                <View style={styles.container}>


                    <View style={{height: '20%', marginBottom: 20}}>
                        <Text style={styles.label}> Selecione uma categoria</Text>
                        <View style={styles.categoriesContainer}>
                            {this.renderCategories()}
                        </View>

                    </View>


                    <View>
                        <Text style={[styles.label, { marginTop: 50 }]}> Preencha os campos abaixo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Descricao"
                            onChangeText={(description) => this.setState({ description })}
                            clearButtonMode='always'
                            value={this.state.description}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Valor R$"
                            onChangeText={(value) => this.setState({ value })}
                            keyboardType={'number-pad'}
                            clearButtonMode='always'
                            value={this.state.value}
                        />
                    </View>

                    <View>
                        <Button
                            onPress={this.submit}
                            title="Incluir"
                        />
                    </View>



                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20
    },
    input: {
        padding: 5,
        borderBottomColor: '#00ADA9',
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 10
    },

    label: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
    },

    categoriesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 20,
    },
    category: {
        padding: 10,
        width: '33%'
    }

});
