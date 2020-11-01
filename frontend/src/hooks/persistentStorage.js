import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (key, defaultValue) => {
    const [state, setState] = useState(defaultValue);
    const [updated, setUpdated] = useState(false);
  
    async function getStorageValue() {
        let value = defaultValue;
        try {
            value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
        } catch (e) {
            console.error(e);
        }

        setState(value);
        setUpdated(true);
    }
  
    async function updateStorage(newValue) {
        try {
            if (newValue === null) {
                await AsyncStorage.removeItem(key);
            } else {
                const value = JSON.stringify(newValue);
                await AsyncStorage.setItem(key, value);
            }
        } catch (e) {
                console.error(e);
        }
        setUpdated(false);
    }
  
    useEffect(() => {
        if(!updated)
            getStorageValue();
    }, [updated]);
  
    return [state, updateStorage];
  };