import React from 'react';
import { FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../css/styles';
import Action from './Action';
import { Icon } from 'react-native-elements'
import { useValueContext } from '../Context';

export default ({ navigation }) => {
    const {ip, key} = useValueContext();

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('Settings')}
                title="Settings"
            >
                <Icon name="settings" />
            </TouchableOpacity>

            <FlatList
                data={[
                    {title: "rainbow", endpoint: "rainbow", ip, key},
                    {title: "simplerainbow", endpoint:"simplerainbow", ip, key},
                    {title: "off", endpoint:"off", ip, key},
                ]}
                renderItem={Action}
                keyExtractor={item => item.title}
            />
        </ScrollView>
    );
}
