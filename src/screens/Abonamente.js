import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import Language from "./utils/Language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Col, Row, Grid } from "react-native-easy-grid";

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
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getAbo, senddata } from "../wpcurl/wpcurl";

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

const disabledButton = (language) => {
  return (
    <View>
      <Text
        status="warning"
        style={{
          textAlign: "center",
          fontSize: 20,
          paddingBottom: 20,
        }}
      >
        {language}
      </Text>
      <Button
        size="lg"
        status="danger"
        disabled
        color={themeColor.white}
        text={Language["ro"][18]}
        type="TouchableOpacity"
        leftContent={
          <Ionicons name="time" size={30} color={themeColor.white} />
        }
      ></Button>
    </View>
  );
};

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();

  const [listaAbonamente, setListaAbonamente] = useState(
    <View style={{ alignItems: "center", margin: 10 }}>
      <Text status="primary" fontWeight="medium">
        {" "}
        {Language["ro"][38]}
      </Text>
    </View>
  );

  const [listaState, setListaState] = useState(true);
  const [userData, setUserData] = useState();
  
  const [userId, setUserId] = useState(0);
 
  
  const listaAbo = (lista) => {
    setListaState(false);

    const renderListaAbonamente = () => {
      if (lista)
      return Object.keys(lista).map((titluAbo) => {
        return (
          <Row key={titluAbo} style={{ margin: 5 }}>
            <MaterialIcons
              name="fitness-center"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                textAlign: "left",
                fontSize: 16,
                alignSelf: "flex-start",
              }}
            >
              {titluAbo}{" "}
            </Text>
            <Text status="warning" style={{ flex: 1, textAlign: "right" }}>
              {" "}
              {parseInt(Object.values(lista[titluAbo]["max_price"])[0])} RON
            </Text>
          </Row>
        );
      });
    };

    return (
      <Grid style={{ width: "95%", margin: 10 }}>
        {renderListaAbonamente()}
      </Grid>
    );
  };

  if (!userData) {

    getData("cont").then((data) => {
      if (JSON.parse(data)) {
        
        let allData = JSON.parse(data);
        
        setUserData(allData);
      }
    });
  }

  function sendReqAccess() {
    getData("cont").then((data) => {
      if (JSON.parse(data)) {
        let allData = JSON.parse(data);
        // console.log(allData.woocommerce_meta);

        if (typeof allData.id == "number") {
          setUserData(allData);
          senddata("sendReqAccess", allData.id, false, false, false).then(
            (data) => {
              if (data.data == "Request sent") {
                setAboText(disabledButton());
              }
            }
          );
        }
      }
    });
  }

  const parasireSalaButton = () => {
    return (
      <View>
        <Text
          status="warning400"
          style={{
            textAlign: "center",
            fontSize: 20,
            paddingBottom: 20,
          }}
        >
          {Language["ro"][40]}
        </Text>
        <Button
          onPress={() => sendReqLeave()}
          size="lg"
          status="warning500"
          color={themeColor.warning700}
          text={Language["ro"][41]}
          type="TouchableOpacity"
          leftContent={
            <MaterialCommunityIcons
              name="exit-run"
              size={30}
              color={themeColor.white}
            />
          }
        ></Button>
      </View>
    );
  };

  const [aboText, setAboText] = useState(
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          paddingBottom: 20,
          color: themeColor.danger,
        }}
      >
        {Language["ro"][33]}
      </Text>
      <Button
        size="lg"
        status="danger"
        color={themeColor.danger}
        text={Language["ro"][35]}
        type="TouchableOpacity"
        leftContent={
          <Ionicons
            name="close-circle-outline"
            size={30}
            color={themeColor.white}
          />
        }
      ></Button>
    </View>
  );

  useEffect(() => {
    let increment2 = 1;
    getData("cont").then((data) => {

      
      
      if (JSON.parse(data)) {
        let allData = JSON.parse(data);

         //console.log(allData.woocommerce_meta);
         
          
         
        if (typeof allData.id == "number") {
          
          const intervalId = setInterval(() => {
            
          console.log(allData.id) ;
            
          
            getAbo(allData.id).then((data) => {
              let uTimestamp = Math.floor(Date.now() / 1000);
              let increment = 1;
              
              

              if (listaState == true && data && data["listaAbo"])
                setListaAbonamente(listaAbo(data["listaAbo"]));

              if (data["status"] == "asteaptaAccess") {
                setAboText(disabledButton(Language["ro"][39]));

                // return () => clearInterval(intervalId);
              } else if (data["status"] == "parasireSala") {
                // clearInterval(intervalId);
                setAboText(parasireSalaButton());
              } else if (data["status"] == "asteaptaIesire") {
                //  clearInterval(intervalId);
                setAboText(disabledButton(Language["ro"][42]));
              } else if (data["status"] == "block") {
                //clearInterval(intervalId);
                setAboText(disabledButton(Language["ro"][44]));
              } else
              if (data && data["aboData"] )
                Object.keys(data["aboData"]).forEach((key) => {
                  if (
                    data["aboData"][key]["_status"] == "active" &&
                    uTimestamp < data["aboData"][key]["_end_date"] &&
                    increment == 1
                  ) {
                   
                  const Expira=(new Date(data["aboData"][key]["_end_date"]*1000)).toISOString().slice(0, 10);

                    setAboText(
                      <View  >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            paddingBottom: 20,
                            color: themeColor.success800,
                          }}
                        >
                          {Language["ro"][34]}
                        </Text>
                        <Button
                          onPress={() => {
                            sendReqAccess();
                          }}
                          size="lg"
                          color={themeColor.success800}
                          text={Language["ro"][36]}
                          type="TouchableOpacity"
                          leftContent={
                            <Ionicons
                              name="checkmark-circle-outline"
                              size={30}
                              color={themeColor.white}
                            />
                          }
                        ></Button>
                        <Text style={{textAlign:"center",padding:10}}> {data["aboData"][key]["_title"]} </Text>
                        <Text style={{textAlign:"center",padding:10}}>{Language['ro'][46]} {Expira}</Text>
                      </View>
                    );
                    increment++;
                  }
                });
            });
          }, 1000);
        }
      }
    });
  }, []);

  function sendReqLeave() {
    getData("cont").then((data) => {
      if (JSON.parse(data)) {
        let allData = JSON.parse(data);

        if (typeof allData.id == "number") {
          senddata("sendReqLeave", allData.id, false, false, false).then(
            (data) => {
              if (data.data == "Request Leave") {
                setAboText(disabledButton(Language["ro"][42]));
              }
            }
          );
        }
      }
    });
  }

  return (
    <Layout style={{ alignItems: "center" }}>
      <ImageBackground
        source={require("../../assets/The-Rock-Gym-1079-scaled.jpg")}
        style={styles.backgroundImage}
      >
        <TopNav
          backgroundColor={themeColor.black400}
          borderColor={themeColor.black100}
          middleContent={Language["ro"][32]}
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.black}
            />
          }
          leftAction={() => navigation.goBack()}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
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

            <Section style={{ margin: 10, opacity: 0.95, shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2 }}>
              <SectionContent style={{ backgroundColor: "#000" }}>
                {aboText}
              </SectionContent>
            </Section>

            <Section
              style={{ margin: 10, opacity: 0.95,alignItems:"center", shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2 }}



            >
              <SectionContent style={{ backgroundColor: "#000" }}>
                <Text size="h3" style={{ textAlign: "center", margin: 20 }}>
                  {Language["ro"][37]}
                </Text>
                <Text style={{ textAlign: "center" }}>{listaAbonamente}</Text>
              </SectionContent>
            </Section>
          </SafeAreaView>
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
});
