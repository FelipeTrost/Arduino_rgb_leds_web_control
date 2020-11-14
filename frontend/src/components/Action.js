import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { useValueContext } from '../Context';
import styles from '../css/styles';
import ColorPickerModal from './ColorPickerModal';

export default ({ item }) => {
    const {ip, key} = useValueContext();
    const {title, endpoint, color} = item;

    const [colorPicker, setColorPicker] = useState(false);
    
    const send = extra => {
        console.log(`${ip}/${key}/${endpoint}${extra || ""}`);
        fetch(`${ip}/${key}/${endpoint}${extra || ""}`)
        .catch(() => alert("Error"));
    }

    const action = () => {
        if(!color) send();
        else setColorPicker(true);
    }

    return (
        <View style={styles.action}>
            <Text style={{fontWeight: "bold"}}>
                {title}
            </Text>

            <Button 
                title={color? "Color" : "Send"}
                onPress={action}
            />

            <ColorPickerModal 
                visible={colorPicker}
                onColor={c => {
                    send(`/${c.r}/${c.g}/${c.b}`);
                    setColorPicker(false);
                }}
                close={() => setColorPicker(false)}
            />
        </View>)
}