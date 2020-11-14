import React, { useState } from 'react';
import { View , Text, Button, TextInput } from 'react-native';
import { useValueContext } from '../Context';
import styles from '../css/styles';

export default () => {
    const {configIp, configKey, ip, key} = useValueContext();

    const [ipInput, setIp] = useState(ip);
    const [keyInput, setKey] = useState(key);


    return (
        <View style={styles.center}>
            <View style={styles.container}>
                <Text>Arduino LAN adress</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setIp(text)}
                    value={ipInput}
                />

                <Text>Arduino key</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setKey(text)}
                    value={keyInput}
                />

                <Button 
                    onPress={()=>{
                        Promise.all([
                            configIp(ipInput),
                            configKey(keyInput)
                        ])
                        .then(() => alert('Done succesfuly'))
                    }}
                    title='Save'
                />
            </View>
        </View>
    );
}
