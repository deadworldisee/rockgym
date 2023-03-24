import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import Language from "./utils/Language";

import {
  Layout,
  TopNav,
  themeColor,
  useTheme,
  Text,
  Section,
  SectionContent,
  Button,
} from "react-native-rapi-ui";

import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { getAbo, getNrClienti, cameraPlay } from "../wpcurl/wpcurl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();

  const timestamp = new Date().getTime();

  const video1 = React.useRef(null);
  const video2 = React.useRef(null);
  const video3 = React.useRef(null);



  const [status1, setStatus1] = React.useState({});
  const [status2, setStatus2] = React.useState({});
  const [status3, setStatus3] = React.useState({});

  const [VideoURL1, setVideoURL1] = React.useState('');
  const [VideoURL2, setVideoURL2] = React.useState('');
  const [VideoURL3, setVideoURL3] = React.useState('');

  const [statusButton1, setStatusButton1] = React.useState("Play");
  const [statusButton2, setStatusButton2] = React.useState("Play");
  const [statusButton3, setStatusButton3] = React.useState("Play");

  const [AboStatus, setAboStatus] = useState(false);
  const [nrClienti, setNrClienti] = useState(0);

  const viewCamera = async  (camera, statusV, videoV, button ) => {
     cameraPlay(camera).then((data) => {




      if (!statusV.isPlaying)
      {
      let a = 1;
      const countdown = setInterval(() => {
        switch(button)
        {
          case 1:
            setStatusButton1(a);
           
          break;
          case 2:
            setStatusButton2(a);
          break;
          case 3:
            setStatusButton3(a);
          break;
        }
        
        if (a === 0) {
          clearInterval(countdown);
          switch(button)
          {
            case 1:
          
          setVideoURL1('https://rockgym.ro/auth/camera6/index.m3u8');
              setStatusButton1("Pause");
           
          
            break;
            case 2:
             
                setVideoURL2('https://rockgym.ro/auth/camera8/index.m3u8');
                setStatusButton2("Pause");
            
            break;
            case 3:
             
                setVideoURL3('https://rockgym.ro/auth/camera10/index.m3u8');
                setStatusButton3("Pause");
             
            break;
          }



        
            videoV.current.playAsync();

          
        
          
        } else {
          a--;
        }
      }, 1000);
    }
    else 
    {
      videoV.current.pauseAsync();
      switch(button)
      {
        case 1:
          setStatusButton1("Play");
         
        break;
        case 2:
          setStatusButton2("Play");
        break;
        case 3:
          setStatusButton3("Play");
        break;
      }
    }

    });
  };

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

  useEffect(() => {
    getNrClienti().then((data) => {
      setNrClienti(data);
    });

    getData("cont").then((data) => {
      if (JSON.parse(data)) {
        let allData = JSON.parse(data);

        // console.log(allData.woocommerce_meta);
        if (typeof allData.id == "number") {
          const intervalId = setInterval(() => {
            getAbo(allData.id).then((data) => {
              let uTimestamp = Math.floor(Date.now() / 1000);
              let increment = 1;

              if (data && data["aboData"])
              Object.keys(data["aboData"]).forEach((key) => {
                if (
                  data["aboData"][key]["_status"] == "active" &&
                  uTimestamp < data["aboData"][key]["_end_date"] &&
                  increment == 1
                ) {
                  setAboStatus(true);
                  increment++;
                }
              });
            });
          }, 1000);
        }
      }
    });
  }, []);

  return (
    <Layout>
      <TopNav
        backgroundColor={themeColor.black400}
        borderColor={themeColor.black100}
        middleContent={Language["ro"][45]}
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />

      <ImageBackground
        source={require("../../assets/The-Rock-Gym-1079-scaled.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Section style={{ margin: 10, opacity: 0.75 }}>
            <SectionContent style={{ backgroundColor: "#000" }}>
              {AboStatus && (
                <Text size="lg" fontWeight="regular">
                  In prezent sunt {nrClienti} persoane in sala.
                </Text>
              )}
              {!AboStatus && (
                <Text
                  size="h2"
                  fontWeight="regular"
                  style={{ color: "red", textAlign: "center" }}
                >
                  {Language["ro"][33]}
                </Text>
              )}
            </SectionContent>
          </Section>
          {AboStatus && (
          <Section style={{ margin: 10, opacity: 0.75, shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5 }}>
            <SectionContent style={{ backgroundColor: "#000" }}>
              <View>
                <Video
                  ref={video1}
                  style={{
                    
                    height: 250,
                  }}
                  source={{
                    uri: VideoURL1,
                  }}
                  useNativeControls
                  posterSource={{
                    uri: `http://rockgym.ro/auth/getCameraThumb.php?cameraThumb=6&t=${timestamp}`,
                  }}
                  posterStyle={{ height: 250 }}
                  usePoster={true}
                  resizeMode="stretch"
                  isLooping
                  onPlaybackStatusUpdate={(status1) =>
                    setStatus1(() => status1)
                  }
                />
                
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  color="#fab90b"
                  text={statusButton1}
                  onPress={() => {
                    viewCamera(6, status1, video1,1);
                  }}
                />
              </View>
            </SectionContent>
          </Section>
          )} 
          {AboStatus && (
          <Section style={{ margin: 10, opacity: 0.75 }}>
            <SectionContent style={{ backgroundColor: "#000" }}>
              <View>
                <Video
                  ref={video2}
                  style={{
                    height: 250,
                  }}
                  source={{
                    uri: VideoURL2,
                  }}
                  useNativeControls
                  posterStyle={{ height: 250 }}
                  resizeMode="stretch"
                  posterSource={{
                    uri: `http://rockgym.ro/auth/getCameraThumb.php?cameraThumb=8&t=${timestamp}`,
                  }}
                  usePoster={true}
                  isLooping
                  onPlaybackStatusUpdate={(status2) =>
                    setStatus2(() => status2)
                  }
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  color="#fab90b"
                  text={statusButton2}
                  onPress={() => {
                    viewCamera(8, status2, video2,2);
                  }}
                />
              </View>
            </SectionContent>
          </Section> )}
          {AboStatus && (
          <Section style={{ margin: 10, opacity: 0.75 }}>
            <SectionContent style={{ backgroundColor: "#000" }}>
              <View>
                <Video
                  ref={video3}
                  style={{
                    // width: 0.85 * Dimensions.get("window").width,
                    height: 250,
                  }}
                  source={{
                    uri: VideoURL3,
                  }}
                  useNativeControls
                  posterSource={{
                    uri: `http://rockgym.ro/auth/getCameraThumb.php?cameraThumb=10&t=${timestamp}`,
                  }}
                  usePoster={true}
                  resizeMode="stretch"
                  isLooping
                  onPlaybackStatusUpdate={(status3) =>
                    setStatus3(() => status3)
                  }
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  color="#fab90b"
                  text={statusButton3}
                  onPress={() => {
                    viewCamera(10, status3, video3,3);
                  }}
                />
              </View>
            </SectionContent>
          </Section> 
           )}
        </ScrollView>
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

    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
