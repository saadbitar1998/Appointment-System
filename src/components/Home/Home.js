import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, ActivityIndicator, TextInput  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SellerItem from './SellerItem';
import { Dimensions } from "react-native";
import ip from '../../../util';
const width = Dimensions.get('window').width; //full width

const Home = (props) => {

    const [sellers, setSellers] = useState([]);
    const [filteredSellers, setFilteredSellers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');

    // method to get List of the sellers from the server
    const getSellers = async () => {

        console.log('get Sellers');

        const token = await AsyncStorage.getItem('token');

        fetch('http://'+ ip + '/sellers/', {
            method: 'GET',
            headers: { 
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Creating or editing a post failed!');
            }
            return res.json();
        })
        .then(resData => {
            
            resData.sellers.forEach(item => {
                console.log(item);
            })
            
            setSellers(resData.sellers);
            setFilteredSellers(resData.sellers);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        })

    }

    // when the component Loads -> get the sellers
    useEffect(() => {
        getSellers();
    }, []);


    const { navigation } = props;

    // when logout is pressed
    const handleLogout = async () => {
        console.log('Logout');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        navigation.navigate('login');
    }


    const handleItemClicked = (item) => {
        navigation.navigate('seller', {passedItem: item});
    }


    const handleSearch = (text) => {
        setQuery(text);
        const formattedQuery = text.toLowerCase();
        
        console.log('length: ', formattedQuery.length);
        if(formattedQuery.length == 0){
            setFilteredSellers(sellers);
        } else {
            const newFilteredSellers = [...sellers];
            let s = newFilteredSellers.filter(seller => {
                return seller.name.toLowerCase().includes(text);
            })
            console.log('FILTERED LIST: ', s);
            setFilteredSellers(s);
        }
    }


    let sellersView;
    if(sellers.length > 0) {

        sellersView = (
            <FlatList 
                keyExtractor={(s) => s.id.toString()}
                removeClippedSubviews={false}
                ListHeaderComponent={
                    <TextInput 
                        onChangeText={(val) => handleSearch(val)}
                        value={query}
                        placeholder='Search Sellers...'
                        style={styles.search} 
                    />
                }
                data={filteredSellers}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleItemClicked(item)}
                    >
                        <SellerItem item={item}/>
                    </TouchableOpacity>
                )}
            />
   
        )
    } else {
        sellersView = <Text>No Available Sellers</Text>
    }

    return (
        <View style={styles.container}>

            {/* {
                isLoading ? (<ActivityIndicator animating size='large' />)
                :
                    
            } */}
            {sellersView}
            <View style={styles.logout_container}>
                <TouchableOpacity
                    style={styles.logoutButton} 
                    onPress={() => handleLogout()}
                >
                    <Text style={{color: 'white'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5C4FFD'
    },
    logout_container: {
        position: 'absolute',
        bottom:0,
        height: 30,
        left:0, 
    },
    logoutButton: {
        // position: 'absolute',
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#fff",
        margin: 10,
    },
    item: {
        margin: 10,
    }

})