import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Pressable, ToastAndroid } from 'react-native';
import TimeComponent from './TimeComponent';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ip from '../../../util'


const Seller = ({ route, navigation }) => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const { passedItem } = route.params;
    const [item, setItem] = useState(passedItem);


    const handleItemClicked = (item) => {

        setModalVisible(true);
        setSelectedItem(item);
    }

    // when the user wants to save an appointment
    const handleSaveAppointment = async () => {

        setModalVisible(!modalVisible)
        const buyerId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        console.log('In SAVE', buyerId);
        fetch('http://' + ip + '/appointments/buyer/' + buyerId, {
            method: 'PUT',
            headers: { 
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appointment: selectedItem,
                sellerId: item.id,
            })
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Creating or editing a post failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log('resData', resData);
            const newItem = {...item};
            newItem.available_slots = resData.slots;
            setItem(newItem);
            ToastAndroid.showWithGravity(
                "Appointment saved",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );

        })
        .catch(error => {
            console.log(error);
        })

    }

    let appointments;
    if(item.available_slots.length > 0) {
        appointments = (
            <View>
                <Text style={{color: 'black', fontSize: 20, paddingLeft: 10}}>Please Pick an Appointment</Text>
                <FlatList 
                    data={item.available_slots}
                    keyExtractor={(slots) => slots._id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handleItemClicked(item)}
                        >
                            <TimeComponent start_time={item.start_time} end_time={item.end_time}/>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    } else {
        appointments = <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>The seller did not set Timeslots</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.item_info}>
                <Text style={{color: 'white', fontSize: 25, textAlign: 'center', fontWeight: 'bold', padding: 5, fontFamily: 'DancingScript-VariableFont_wght'}}>{item.name}</Text>
                <Text style={{color: 'white', fontSize: 20, padding: 5}}>{item.description}</Text>
            </View>
            
           {appointments}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to request an Appointment from</Text>
                        {
                            selectedItem ?
                                <Text>{selectedItem.start_time} to {selectedItem.end_time}</Text>
                            : null
                        }

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => handleSaveAppointment()}
                            >
                                <Text style={styles.textStyle}>Save</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

   

}

export default Seller;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        
    },
    item: {
    },
    item_info: {
        backgroundColor: '#5C4FFD',
        padding: 10,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButtons: {
        flexDirection: 'row',
    },
    button: {
        margin: 10,
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})