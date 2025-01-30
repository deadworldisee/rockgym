import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  ImageBackground
} from "react-native";
import { senddata } from "../../wpcurl/wpcurl";
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
import Language from "../utils/Language";
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
 
 

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [typeError, setTypeError] = useState("");

  async function forget() {
   
    setLoading(true);
    await senddata('requestPass' ,email,false,false,false,false).then(response=> {

    
      setLoading(false);
      if(response.data ==true)
          setErrorMsg(Language['ro'][19]);
      else
          setErrorMsg(Language['ro'][24]);   
      

      
      setTypeError('Error'); 
      })
      .catch(function (error) {
        setLoading(false);
        setErrorMsg('Error');
        setTypeError('Error'); 
        
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
          <Section style={{opacity: 0.90, margin:10, shadowColor: "#fff",
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
              
              padding: 0,
            }}
          >
            <Text
              size="h3"
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 10,
              }}
            >
              {Language['ro'][17]}
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
            <Button
              text={loading ?  Language['ro'][12] : Language['ro'][20]}
              onPress={() => {
                forget();
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
              <Text size="md">{Language['ro'][23]}</Text>
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
                </TouchableOpacity>*/}
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
