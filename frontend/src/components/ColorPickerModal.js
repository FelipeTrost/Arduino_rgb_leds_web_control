import React from 'react';
import { Text, View, Button, Platform, Modal as NativeModal, StyleSheet, TouchableHighlight } from 'react-native';
import WebModal from 'modal-react-native-web';
import Slider from '@react-native-community/slider'
import { ColorPicker, fromHsv } from 'react-native-color-picker';
const Modal = Platform.select({
    native: NativeModal,
    default: WebModal,
})

export default ({ visible, onColor, close }) => {
    
    const send = () => {
        fetch(`${ip}/${key}/${endpoint}`)
        .catch(() => alert("Error"));
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
            <View style={styles.centeredView}>
                <View style={{flex: 1, padding: 45, backgroundColor: '#fff', maxHeight: 400}}>
                    <Text style={{color: 'white'}}>React Native Color Picker - Uncontrolled</Text>
                    <ColorPicker
                        oldColor='purple'
                        onColorSelected={color => onColor(hexToRgb(color))}
                        style={{flex: 1}}
                        sliderComponent={Slider}
                    />
                    <br/>
                    <TouchableHighlight
                        style={{ backgroundColor: "#F194FF",
                        borderRadius: 20,
                        padding: 10,
                        elevation: 2, backgroundColor: "#2196F3" }}
                        onPress={() => close && close()}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      flex: 1,
      
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}