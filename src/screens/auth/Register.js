

import React, {  useState } from "react";

import Language from "../utils/Language";

import AsyncStorage from '@react-native-async-storage/async-storage';

//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  ScrollView,
  TouchableOpacity,
  View,
   Image,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import  {useAuth}  from "../../provider/AuthProvider";

//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
  import {senddata} from "../../wpcurl/wpcurl";
  import ModalAlert from "../../components/utils/ModalAlert";



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
  const { isDarkmode, setTheme } = useTheme();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [typeError, setTypeError] = useState("");
 

  async function register() {
    setLoading(true);

    await  senddata('newaccount',email,password,username,firstname,lastname).then(msg=> {

        console.log(msg.status);
           
              if(msg.status  =='user created')

                {

                   senddata('login' ,username,password,false,false,false).then(msg=> {
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
                        
                       
                        
                            const storeData =  (key, value) => {
                              try {
                                 AsyncStorage.setItem(key, value);
                              } catch (error) {
                                console.log(error);
                              }
                            };
                                
                            storeData('cont',JSON.stringify(msg.data));
                            
                            setLoading(false);
                            auth.signIn(); 
                           
                          }
                
                          
                
                        })


                  

                  
                } 
                         
                else  if(msg.status  =='error')
              {
                setLoading(false);
                setErrorMsg(msg.data);
                setTypeError('Error');
                
                
              //    console.log(typeError);
              }
              

      })
      .catch(function (error) {
        console.log(error);
       
        
    });
     
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
          <Section style={{opacity: 0.90,margin:10, shadowColor: "#fff",
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
             
              paddingBottom: 20,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                paddingBottom: 30,
                paddingTop:10
              }}
            >
              {Language['ro'][0]}
            </Text>
            <Text>{Language['ro'][1]}</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder={Language['ro'][2]}
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

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
            
         
            <Text style={{ marginTop: 15 }}>{Language['ro'][7]}</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder={Language['ro'][8]}
              value={firstname}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(text) => setFirstName(text)}
            />
            <Text style={{ marginTop: 15 }}>{Language['ro'][9]}</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder={Language['ro'][10]}
              value={lastname}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(text) => setLastName(text)}
            />
            <Button
              text={loading ? Language['ro'][12] : Language['ro'][11]}
              onPress={() => {
                register();
              }}
              style={{
                marginTop: 20,
              }}
              color='#fab90b'
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
              <Text size="md">{Language['ro'][13]}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                 {Language['ro'][14]}
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
            {/*  <TouchableOpacity
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
                </TouchableOpacity> */}
            </View>
          </View>
          </SectionContent>
          </Section>
        </ScrollView>
        
        </ImageBackground>
  </Layout>
  </KeyboardAvoidingView>
  );
}
