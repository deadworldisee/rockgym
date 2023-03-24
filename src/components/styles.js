import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
       
      
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      padding:0,
      paddingBottom:0,
     
      width:'100%'
    },
    map: {
      flex:1,
      alignItems: 'center',
      
      width: 400,
    height: 300,
    resizeMode: 'contain'
    },
  });

  export { styles }  