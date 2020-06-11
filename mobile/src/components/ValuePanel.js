import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, ActivityIndicator, Colors } from 'react-native-paper';

const ValuePanel = ({title, value}) => {

    return (
        <Card style={styles.card}>
            <Card.Title 
                title={title}
                titleStyle={styles.title}
                right={() => 
                    (value === undefined || value === null) ? 
                        <ActivityIndicator style={styles.activity} animating={true} color={Colors.white} /> : 
                        <Text style={styles.value}>{value.toFixed(2)}</Text>
                }
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },
    card: {
        padding: 10,
        backgroundColor: '#424242',
        marginTop: 15
    },
    value: {
        color: '#fff',
        fontSize:24,
        paddingRight: 10
    },
    activity: {
        paddingRight: 10
    }
});

export default ValuePanel;