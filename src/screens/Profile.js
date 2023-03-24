import React, { useEffect, useState } from "react";
import { View, Image, ScrollView ,ImageBackground,StyleSheet,SafeAreaView} from "react-native";
import Language from "./utils/Language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Col, Row, Grid } from "react-native-easy-grid";
import { getPoza } from "../wpcurl/wpcurl";
import {
  Layout,
  Text,
  Section,
  SectionContent,
  Avatar,
} from "react-native-rapi-ui";



export default function ({ navigation }) {
  const [allData, setAllData] = useState({});
  const [avatar, setAvatar] = useState();
  const [poza,setPoza]=useState();
  const getData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);

      if (data !== null) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

 // if(!allData)
  useEffect(() => {
    getData("cont").then((data) => {
      let internalData = JSON.parse(data);
     // console.log(internalData);

      if (internalData) {
        setAllData(internalData);
        setAvatar(internalData.avatar_urls[96]);
        setPoza(internalData.avatar_urls[96]);
        getPoza(JSON.stringify(internalData.id)).then((data)=>{
        
           if(data.length>10)
          setPoza(data);
         
        })
      }

    });
      
  },[]);



  const date = new Date(allData.registered_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("default", options);


 // console.log(allData);
  return (
    <Layout  >
   
          <ImageBackground
        source={require("../../assets/The-Rock-Gym-1079-scaled.jpg")}
        style={styles.backgroundImage}
      >

<SafeAreaView style={styles.root}>
 <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        
      }}
    >

        <Image
          resizeMode="contain"
          style={{
            height: 200,
            width: 350,
            
          }}
          source={require("../../assets/logoapp.png")}
        />

        <Section style={{opacity:0.75,margin:10,}}>
          <SectionContent style={{backgroundColor:'#000'}}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 20, paddingBottom: 20 }}
              >
                {Language["ro"][30] + allData.name}
              </Text>
              <Avatar source={{ uri: poza }} size="xl" shape="round" />
             
              <Grid style={{ width: '100%' ,marginTop:20}}>
                <Row >
                <Col style={{ width: 120 }}><Text>Nume:</Text></Col>
                <Col ><Text>{allData.name}</Text></Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                <Col style={{ width: 120 }}><Text>Username:</Text></Col>
                <Col><Text>{allData.username}</Text></Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                <Col style={{ width: 120 }}><Text>Email:</Text></Col>
                <Col><Text>{allData.email}</Text></Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                <Col style={{ width: 120 }}><Text>ID:</Text></Col>
                <Col><Text>{allData.id}</Text></Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                <Col style={{ width: 120 }}><Text>Data inscrierii:</Text></Col>
                <Col><Text>{formattedDate}</Text></Col>
                </Row>
              </Grid>
            </View>
          </SectionContent>
        </Section>
        </ScrollView>
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