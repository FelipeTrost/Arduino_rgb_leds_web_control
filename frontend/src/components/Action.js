import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../css/styles';
// import { ColorPicker } from 'react-native-color-picker'
 
// const Picker = () => (
//   <ColorPicker
//     onColorSelected={color => alert(`Color selected: ${color}`)}
//     style={{flex: 1}}
//   />
// )

export default ({ item }) => (
    <View style={styles.action}>
        <Text style={{
            marginRight: 20
        }}> {item.title} </Text>
        <Button 
            title="Do the thing pls"
        />
    </View>
)