import React from "react";
import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Layout, Text, Section, SectionContent } from "react-native-rapi-ui";
import { getMapPreview } from "./utils/location";
import { styles } from "../components/styles";

export default function ({ navigation }) {
  return (
    <Layout>
      <ImageBackground
        source={require("../../assets/The-Rock-Gym-1079-scaled.jpg")}
        style={sty.backgroundImage}
      >
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
<Section style={{ opacity: 0.95,margin:10 }}>
            <SectionContent style={{ backgroundColor: "#000" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ padding: 10 }}>
                  {`Adresa: str. Otilia Cazimir, nr. 10, Iasi, 0773 960 342
               `}
                </Text>
                <Image
                  style={{ ...styles.map, width: "100%" }}
                  source={ getMapPreview() }
                />
              </View>
            </SectionContent>
          </Section>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
}

const sty = StyleSheet.create({
  root: {
    flex: 1,

    alignContent: "center",
  },
  backgroundImage: {
    flex: 1,

    resizeMode: "cover",
  },
});
