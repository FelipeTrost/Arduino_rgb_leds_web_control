import React from 'react';
import { Text, View, Button } from 'react-native';
import { useValueContext } from '../Context';
import styles from '../css/styles';

export default ({ item }) => {
    const {ip, key} = useValueContext();
    const {title, endpoint} = item;
    
    const send = () => {
        fetch(`${ip}/${key}/${endpoint}`)
        .catch(() => alert("Error"));
    }

    return (
        <View style={styles.action}>
            <Text style={{fontWeight: "bold"}}>
                {title}
            </Text>

            <Button 
                title="Send"
                onPress={send}
            />
        </View>)
}