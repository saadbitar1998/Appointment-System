import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SellerItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{item.name}</Text>
            {/* <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '5%'
                }}
            /> */}
        </View>
    )
}

export default SellerItem

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3acbf7',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    name: {
        padding: 10,
        color: 'white',
        fontSize: 20,
    },

    description: {
        color: 'white',
        padding: 10,
        fontSize: 17,
    }

});
