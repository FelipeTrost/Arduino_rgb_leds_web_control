import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = React.createContext();

export function useValueContext() {
  return useContext(Context)
}

export function ContextProvider({ children }) {
  const [ip, setIp] = useState("http://192.168.1.2");
  const [key, setKey] = useState("key-to-arduino");

  const configIp = async newIp => {
    await AsyncStorage.setItem('ip', newIp);
    setIp(newIp);
  }

  const configKey = async newKey => {
    await AsyncStorage.setItem('key', newKey);
    setIp(newKey);
  }

  useEffect(() => {
    Promise.all([
        AsyncStorage.getItem('ip'),
        AsyncStorage.getItem('key')
    ])
    .then(res => {
        const [preip, prekey] = res;
        setIp(preip || "");
        setKey(prekey || "")
    })
  }, [])

  const value = {
    ip,
    key,
    configIp,
    configKey
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}