import React, { useState } from "react";
import Language from "../utils/Language";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from "react-native";
import {senddata} from "../../wpcurl/wpcurl";
import ModalAlert from "../../components/utils/ModalAlert";
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from "../../components/styles";
import  {useAuth}  from "../../provider/AuthProvider";


import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
  Section,
  SectionContent
} from "react-native-rapi-ui";
import { getMapPreview } from "../utils/location";



const sty= StyleSheet.create({
  root: {
    flex: 1,

    alignContent: "center",
  },
  backgroundImage: {
    flex: 1,

    resizeMode: "cover",
  },
});






export default function ({ navigation }) {

   //console.log(auth);

  const { isDarkmode, setTheme } = useTheme();
  const auth2 = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [typeError, setTypeError] = useState("");

  
  


  async function login() {
    setLoading(true);



    
  
 


   
    

    if((username.trim().length == 0) || (password.trim().length == 0 ))
     {
       
        
      await setErrorMsg(Language['ro'][22]);
      await setTypeError('Error'); 
        setLoading(false);  
       // console.log('wdawd');

 
      


     
      
     } 
      else
      {
    await senddata('login' ,username,password,false,false,false).then(msg=> {
    //  console.log(msg.data);
        // console.log(msg.woocommerce_meta);
          if(msg.status  =='error')
          {
   
          setErrorMsg(msg.data);
          setTypeError('Error');
          setLoading(false);
          }

          if(msg.status == 'signedIn')
          {
        
       
        
            const storeData = async (key, value) => {
              try {
                await AsyncStorage.setItem(key, value);
              } catch (error) {
                console.log(error);
              }
            };
                
            storeData('cont',JSON.stringify(msg.data));
            
            setLoading(false);
            //navigation.navigate('Main');
            auth2.signIn();
           
          }

          

        })
        .catch(function (error) {
        //  console.log(error);
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          setLoading(false);
          alert(errorMessage);
          
      });
        
        
        
       
      
    
     
  

         
}





   setTypeError('None');

    
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
      <ImageBackground
    source={require('../../../assets/The-Rock-Gym-1079-scaled.jpg')}
    style={sty.backgroundImage}
  >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
             
              height:200
            }}
          >
            <Image
              resizeMode="contain"
             
              style={{
                
                width: 350,
              }}
              source={require("../../../assets/logoapp.png")}
            />
          </View>
          <ModalAlert type={typeError} msg={errorMsg}></ModalAlert>

          <Section style={{opacity: 0.75,margin:10, shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5}}>
          <SectionContent style={{  backgroundColor: '#000'}}>
         
          <View
            style={{
              flex: 3,
           
             
            }}
          >
            <Text
              fontWeight="bold"
              style={{  alignSelf: "center", padding: 10 }}
              size="h3"  >
              {Language['ro'][14]}
            </Text>
            <Text style={{ marginTop: 15 }}>{Language['ro'][5]}</Text>
         
             <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder={Language['ro'][6]}
              value={username}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(text) => setUsername(text)}
            />







            <Text style={{ marginTop: 15 }}>{Language['ro'][3]}</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder={Language['ro'][4]}
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
             color='#fab90b'
              text={loading ? Language['ro'][18] : Language['ro'][14]}
              onPress={() => {
                login();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">{Language['ro'][15]}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {Language['ro'][16]}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text size="md" fontWeight="bold">
                  {Language['ro'][17]}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
          {/*    <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>

              


              </TouchableOpacity>
                */}
            </View>
            
          </View>
</SectionContent>
</Section>
<Section style={{opacity: 0.75,margin:10,marginTop:0, shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5}}>
          <SectionContent style={{  backgroundColor: '#000'}}>
          <View style={styles.container}>
              <Text style={{padding:10}}>
                {`Adresa: str. Otilia Cazimir, nr. 10, Iasi,
              Camin Studis, 0745 553 141
               `}
                </Text>
                  <Image  style={{ ...styles.map, width: "100%" }} source={{uri: getMapPreview()}}/>
                </View>
                </SectionContent>
                </Section>
        </ScrollView>
        </ImageBackground>
      </Layout>
    </KeyboardAvoidingView>
  );


  
}

