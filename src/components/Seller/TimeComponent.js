import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width; //full width


const TimeComponent = ({start_time, end_time}) => {



    return (
        <View style={styles.container}>
            <View style={styles.time}>
                <Text style={styles.text}>{start_time}</Text>
                <Text style={styles.text}>{' - '}</Text>
                <Text style={styles.text}>{end_time}</Text>
            </View>
        </View>
    )
}

export default TimeComponent

const styles = StyleSheet.create({
    container: {
        borderColor: "#5C4FFD",
        borderWidth: 4,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
    },
    time: {
        width: width * 0.9,
        flexDirection: 'row',
        padding: 10,
    },
    text: {
        color: 'black',
        fontSize: 20
    }

})
