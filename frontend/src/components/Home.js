import React from 'react';
import { FlatList, TouchableOpacity, ScrollView, View } from 'react-native';
import styles from '../css/styles';
import Action from './Action';
import { Icon } from 'react-native-elements'

export default ({ navigation }) => {
    return (
        <View style={styles.center}>
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
                        {title: "Rainbow", endpoint: "rainbow"},
                        {title: "Simplerainbow", endpoint:"simplerainbow"},
                        {title: "Off", endpoint:"off"},
                        {title: "Color", endpoint:"color", color:true},
                    ]}
                    renderItem={({item}) => <Action item={item} />}
                    keyExtractor={item => item.title}
                />
            </ScrollView>
        </View>
    );
}
