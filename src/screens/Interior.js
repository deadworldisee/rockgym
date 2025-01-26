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

// 1. Importăm Video din react-native-video
import Video from "react-native-video";

import { getAbo, getNrClienti, cameraPlay } from "../wpcurl/wpcurl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();

  const timestamp = new Date().getTime();

  // 2. În loc să ținem un status din expo-av, folosim stări booleene pentru a ști dacă un video este playing sau nu
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isPlaying3, setIsPlaying3] = useState(false);

  // 3. Referințe la playeri (dacă vrei să faci .seek sau altceva)
  const video1 = useRef(null);
  const video2 = useRef(null);
  const video3 = useRef(null);

  // 4. URL-urile fișierelor video
  const [VideoURL1, setVideoURL1] = useState("");
  const [VideoURL2, setVideoURL2] = useState("");
  const [VideoURL3, setVideoURL3] = useState("");

  // 5. Texte butoane
  const [statusButton1, setStatusButton1] = useState("Play");
  const [statusButton2, setStatusButton2] = useState("Play");
  const [statusButton3, setStatusButton3] = useState("Play");

  const [AboStatus, setAboStatus] = useState(false);
  const [nrClienti, setNrClienti] = useState(0);

  // 6. Funcția care gestionează logica de „Play/Pause” și setarea URL-ului
  const viewCamera = async (camera, isPlaying, setIsPlaying, setButtonText, setVideoURL, videoRef) => {
    cameraPlay(camera).then((data) => {
      // dacă nu era pe play, pornește-l
      if (!isPlaying) {
        let a = 1;
        const countdown = setInterval(() => {
          setButtonText(a.toString());
          if (a === 0) {
            clearInterval(countdown);

            // Setăm URL în funcție de camera (6, 8, 10)
            if (camera === 6) {
              setVideoURL("https://rockgym.ro/auth/camera6/index.m3u8");
            } else if (camera === 8) {
              setVideoURL("https://rockgym.ro/auth/camera8/index.m3u8");
            } else if (camera === 10) {
              setVideoURL("https://rockgym.ro/auth/camera10/index.m3u8");
            }

            // Setăm starea la "Pause" (adică video-ul este pornit, butonul afișează "Pause")
            setButtonText("Pause");
            setIsPlaying(true);
          } else {
            a--;
          }
        }, 1000);
      } else {
        // Video e deja pornit => îl punem pe pauză
        setIsPlaying(false);
        setButtonText("Play");
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

        if (typeof allData.id == "number") {
          const intervalId = setInterval(() => {
            getAbo(allData.id).then((data) => {
              let uTimestamp = Math.floor(Date.now() / 1000);
              let increment = 1;
              if (data && data["aboData"]) {
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
              }
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
          <Section
            style={{
              margin: 10,
              opacity: 0.95,
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <SectionContent style={{ backgroundColor: "#000" }}>
              {AboStatus && (
                <Text size="lg" fontWeight="regular">
                  În prezent sunt {nrClienti} persoane în sală.
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

          {/* Video 1 */}
          {AboStatus && (
            <Section
              style={{
                margin: 10,
                opacity: 0.95,
                shadowColor: "#fff",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <SectionContent style={{ backgroundColor: "#000" }}>
                <View>
                  <Video
                    ref={video1}
                    // Dacă isPlaying1 e true, atunci paused={false} => rulare
                    paused={!isPlaying1}
                    source={{ uri: VideoURL1 }}
                    style={{ height: 250 }}
                    resizeMode="stretch"
                    // activează controalele native
                    controls={true}
                    // loop
                    repeat={true}
                    // poster (thumbnail)
                    poster={`http://rockgym.ro/auth/getCameraThumb.php?cameraThumb=6&t=${timestamp}`}
                    // setăm ce se întâmplă când pornește/încarcă
                    onLoadStart={() => {
                      // de ex. ai putea seta un spinner etc.
                    }}
                    onError={(err) => {
                      console.log("Video1 Error => ", err);
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button
                    color="#fab90b"
                    text={statusButton1}
                    onPress={() => {
                      viewCamera(
                        6,
                        isPlaying1,
                        setIsPlaying1,
                        setStatusButton1,
                        setVideoURL1,
                        video1
                      );
                    }}
                  />
                </View>
              </SectionContent>
            </Section>
          )}

          {/* Video 2 */}
          {AboStatus && (
            <Section
              style={{
                margin: 10,
                opacity: 0.95,
                shadowColor: "#fff",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <SectionContent style={{ backgroundColor: "#000" }}>
                <View>
                  <Video
                    ref={video2}
                    paused={!isPlaying2}
                    source={{ uri: VideoURL2 }}
                    style={{ height: 250 }}
                    resizeMode="stretch"
                    controls={true}
                    repeat={true}
                    poster={`http://rockgym.ro/auth/getCameraThumb.php?cameraThumb=8&t=${timestamp}`}
                    onError={(err) => {
                      console.log("Video2 Error => ", err);
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button
                    color="#fab90b"
                    text={statusButton2}
                    onPress={() => {
                      viewCamera(
                        8,
                        isPlaying2,
                        setIsPlaying2,
                        setStatusButton2,
                        setVideoURL2,
                        video2
                      );
                    }}
                  />
                </View>
              </SectionContent>
            </Section>
          )}

          {/* Video 3 */}
          {AboStatus && (
            <Section
              style={{
                margin: 10,
                opacity: 0.95,
                shadowColor: "#fff",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <SectionContent style={{ backgroundColor: "#000" }}>
                <View>
                  <Video
                    ref={video3}
                    paused={!isPlaying3}
                    source={{ uri: VideoURL3 }}
                    style={{ height: 250 }}
                    resizeMode="stretch"
                    controls={true}
                    repeat={true}
                    poster={`http://rockgym.ro/auth/getCameraThumb.php?cameraThumb=10&t=${timestamp}`}
                    onError={(err) => {
                      console.log("Video3 Error => ", err);
                    }}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button
                    color="#fab90b"
                    text={statusButton3}
                    onPress={() => {
                      viewCamera(
                        10,
                        isPlaying3,
                        setIsPlaying3,
                        setStatusButton3,
                        setVideoURL3,
                        video3
                      );
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
