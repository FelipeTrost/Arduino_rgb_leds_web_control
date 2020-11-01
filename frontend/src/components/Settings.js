import React, { useEffect, useState } from 'react';
import { View , Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../css/styles';

export default () => {
    const [ip, setIp] = useState('192.168.0.1');
    const [key, setKey] = useState('key');

    useEffect(()=> {
        Promise.all([
            AsyncStorage.getItem('ip'),
            AsyncStorage.getItem('key')
        ])
        .then(res => {
            const [preip, prekey] = res;
            setIp(preip);
            setKey(prekey)
        })
    }, []);

    return (
        <View style={styles.container}>
            <Text>Arduino LAN adress</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setIp(text)}
                value={ip}
            />

            <Text>Arduino key</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setKey(text)}
                value={key}
            />

            <Button 
                onPress={()=>{
                    Promise.all([
                        AsyncStorage.setItem('ip', ip),
                        AsyncStorage.setItem('key', key)
                    ])
                    .then(() => alert('Done succesfuly'))
                }}
                title='Save'
            />
        </View>
    );
}
