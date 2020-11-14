import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      maxWidth: 800,
      width: '90%',
      margin: 'auto',
      marginTop: 20,
    },
    textInput: {
      marginBottom: 30,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    floatingButton: {
      // width: 'fit-content',                                  
      padding: 10,
      backgroundColor:'#fff',
      borderRadius:100,
  },
    action: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 40,
      paddingRight: 40,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 10,
      position: 'relative'
    },
    actionText: {
      color: 'red',
      marginRight: 200
    },
    floatingPicker: {

    }
});