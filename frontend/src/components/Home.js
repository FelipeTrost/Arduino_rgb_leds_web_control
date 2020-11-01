import React from 'react';
import { View , Text, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from '../css/styles';
import Action from './Action';
import { Icon } from 'react-native-elements'

export default ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('Settings')}
                title="Settings"
            >
                <Icon name="settings" />
            </TouchableOpacity>

            <FlatList
                data={[
                    {title: "hola", h:"jajajajajajajajaja"},
                    {title: "hola", h:"jajajajajajajajaja"},
                    {title: "hola", h:"jajajajajajajajaja"},
                    {title: "hola", h:"jajajajajajajajaja"}
                ]}
                renderItem={Action}
            />
        </View>
    );
}
