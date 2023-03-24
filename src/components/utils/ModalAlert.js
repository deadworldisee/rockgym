import  { useEffect, useState } from "react";

import {  Modal,  Text, Pressable, View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

export default (props)  => {

    

    const [modalVisible, setModalVisible] = useState(false);

   useEffect(() => {


        switch(props.type)
        {
            case 'Error':
            let  modalType = 'modalError';
            setModalVisible(true);
            
                break;

          
        }   
            



        },[props]);
    return (
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{...styles.modalText,...styles.modalError}}>{props.msg}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
      
      </View>
    
        )
}
EStyleSheet.build();

const styles = EStyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width: '80%', 
      margin: 20,
      backgroundColor: "black",
      opacity:0.75,
      borderRadius: 20,

      padding: 35,
      alignItems: "center",
      shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
       marginTop:30, 
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom:10,
      paddingTop: 10,  
      width:'50%',
      
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#fab90b",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },

    modalError: {
        color: 'red',
        fontWeight: "bold",
      textAlign: "center"

    },

    modalText: {
      marginBottom: 15,
      textAlign: "left",
      
    }
  });

