import React, { useState } from "react";
import { View, Image,StyleSheet,SafeAreaView ,ImageBackground} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Language from "./utils/Language";
import { useTheme, themeColor } from "react-native-rapi-ui";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
  const [allData, setAllData] = useState({});

  const getData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      // console.log('data');
      if (data !== null) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getData("cont").then((data) => {
    if (JSON.parse(data)) {
      setAllData(JSON.parse(data));
    }
  });
  //console.log(allData.avatar_urls[96]);

  return (


    <Layout > 
                <ImageBackground
    source={require('../../assets/The-Rock-Gym-1079-scaled.jpg')}
    style={styles.backgroundImage}
  >
       <SafeAreaView style={styles.root}>
      <Image
        resizeMode="contain"
        style={{
          height: 200,
          width: 350,
        }}
        source={require("../../assets/logoapp.png")}
      />

      <View
        style={{
          flex: 1,
          // alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section style={{opacity: 0.75}}>
          <SectionContent style={{  backgroundColor: '#000'}}>
            <Text
              style={{ textAlign: "center", fontSize: 20, paddingBottom: 20 }}
            >
              {Language["ro"][30] + allData.name}
            </Text>

            <Button
              text="Abonamente Rock Gym"
              onPress={() => {
                navigation.navigate("Abonamente");
              }}
              style={{
                marginTop: 10,
              }}
             color='#fab90b'
            />
            <Button
              text="Galerie poze"
              onPress={() => {
                navigation.navigate("Galerie");
              }}
              style={{
                marginTop: 10,
              }}
              color='#fab90b'
            />
            <Button
              text="Vizualizare interior"
              onPress={() => {
                navigation.navigate("Interior");
              }}
              style={{
                marginTop: 10,
              }}
              color='#fab90b'
            />
          </SectionContent>
        </Section>
        
      </View>
      
      </SafeAreaView>
      </ImageBackground>
    </Layout>
   
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    
    alignContent: "center",
  },
  backgroundImage: {
    flex: 1,
    
    resizeMode: 'cover',
  },
});