import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const StatusPanel = ({title, color}) => {

    return (
        <Card style={styles.card}>
            <Card.Title 
                title={title}
                titleStyle={styles.title}
                left={() => <Icon name="circle" size={40} color={color}/>}
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
});

export default StatusPanel;