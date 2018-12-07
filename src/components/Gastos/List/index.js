/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatDate } from '../../../utils/misc';

import { sortGastoDateDesc } from '../../../utils/misc';
import PopupMenu from '../../common/tooltip';
import HorizontalScrollIcons from '../../common/horizontal_scroll_icons';
import { removeGasto } from '../../../utils/firebase';

import { orange } from '../../Graficos/colors'

export default class ListScreen extends Component {

    state = {
        categories: [
            {
                title: 'All',
                icon: 'circle-o-notch',
            },
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
        ],
        categorySelected: {
            title: 'All',
            icon: 'circle-o-notch',
        }
    }

    componentDidMount() {
        this.setState({ gastos: sortGastoDateDesc(this.props.gastos) })
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (item) => {
        // updater functions are preferred for transactional updates
        alert('item pressionado')
    };

    _getItemIcon = item => {
        let category = this.state.categories.filter(c => {
            return c.title == item.category
        })

        return <Icon name={category.length > 0 ? category[0].icon : 'question'} size={30} color="#1194F6" />
    }

    _renderItem = ({ item }) => (
        <View
        // onLongPress={() => {
        //     this._onPressItem(item);
        // }}
        >
            <View style={styles.listItem}>
                {/* <Avatar size="xlarge" source={{ uri: repo.item.owner.avatar_url }} /> */}
                <View style={styles.iconContent}>
                    {this._getItemIcon(item)}
                </View>


                <View style={styles.listContent}>
                    <Text
                        style={styles.listTitle}>
                        {item.description ? item.description : item.category}
                    </Text>

                    <View
                        style={styles.flexRow}>
                        <View
                            style={styles.flexRow}>
                            <Text style={styles.textBold}>R$ </Text>
                            <Text style={styles.text}>
                                {parseFloat(item.value).toFixed(2)}
                            </Text>
                        </View>
                        <View
                            style={styles.flexRow}>
                            <Text style={styles.textBold}>Data </Text>
                            <Text style={styles.text}>{formatDate(item.date)}</Text>
                        </View>

                    </View>

                </View>


                <View>
                    <PopupMenu actions={['Edit', 'Remove']}
                        onPress={(eventName, index) => {
                            if (eventName !== 'itemSelected') return;
                            else if (index == 0) { }
                            else if (index == 1) {

                                Alert.alert(
                                    'Tem certeza que deseja remover este item',
                                    'Após a remoção os dados desse item não poderão mais serem restaurados',
                                    [
                                        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        {
                                            text: 'OK', onPress: () => {
                                                let { gastos } = this.state;
                                                gastos = gastos.filter(gasto => gasto.id != item.id);

                                                this.setState({ gastos });
                                                // alert('item removido' + item.id);

                                                removeGasto(item.id);
                                            }
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            }
                        }} />
                </View>
            </View>
        </View>
    );

    filterCategory = (item) => {
        this.setState({
            categorySelected: item
        })
    }

    applyFilter = (gastos) => {
        if (this.state.categorySelected.title !== 'All') {
            return gastos.filter(gasto => {
                return gasto.category == this.state.categorySelected.title;
            })
        }
        return gastos;
    }

    renderList = () => {


        if (this.state.gastos) {
            let data = this.applyFilter(this.state.gastos);

            if (data.length > 0) {
                return <FlatList
                    data={data}
                    // data={[{ text: 'item 1' }, { text: 'item 2' }, { text: 'item 3' }]}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            }
        }

        return (
            <View style={{
                flex: 1,
                padding: 10,
                justifyContent: 'center',
            }}>
                <View style={{  alignItems: 'center' }}>

                    <Icon name="search-minus" size={50} color={orange} />
                    <Text style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 20,
                        textAlign: 'center',
                        marginTop: 5,
                        color: orange

                    }}>
                        Não há itens registrados nessa essa categoria
                    </Text>
                </View>
            </View>
        )



    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{ height: 70 }}>
                    <HorizontalScrollIcons
                        categories={this.state.categories}
                        categorySelected={this.state.categorySelected}
                        updateCategoryHandler={this.filterCategory}
                    />

                </View>

                {this.renderList()}

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },

    listContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


    cardContainerText: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    iconContent: {
        padding: 10
    },
    listContent: {
        marginLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    listTitle: {
        textAlign: 'left',
        fontSize: 16,
        marginBottom: 5,
        color: '#666',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
    },
    textBold: {
        fontWeight: 'bold',
        color: '#666'
    },
    text: {
        color: '#aaa'
    }

});
