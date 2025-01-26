import React, { useState,useEffect } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from "react-native";

import { Layout, TopNav, themeColor, useTheme } from "react-native-rapi-ui";

import { Ionicons } from "@expo/vector-icons";
import Language from "./utils/Language";

import ImageViewing from "../src/ImageViewing";
import ImageList from "../../components/ImageList";
import ImageFooter from "../../components/ImageFooter";
import axios from "axios";
import memoize from "lodash/memoize";
import { ImageSource } from "../src/@types";



export default function ({ navigation }) {


   const [pics, setPics]=useState([]);

  const [currentImageIndex, setImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { isDarkmode } = useTheme();

  const onSelect = (images, index) => {
    setImageIndex(index);

    setIsVisible(true);
  };

  const onRequestClose = () => setIsVisible(false);
  const getImageSource = memoize((images): ImageSource[] =>
    images.map((image) =>
      typeof image.original === "number"
        ? image.original  : { uri: image.original as string }
    )
  );
  const onLongPress = (image) => {
    Alert.alert("Long Pressed", image.uri);
  };


  async function getpics()
  {
    return new Promise((resolve, reject) => {

      axios.post("http://rockgym.ro/auth/pozeApp.php",
      {
        pozeApp: true,
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(function (response) {
      // let files=JSON.parse(response.data);
     //console.log ({'thumbnail': Object.keys(response.data).map(key=> 'http://rockgym.ro/auth/pozeApp/thumbs/'+response.data[key])});
      let pics=[];
     
     Object.values(response.data).forEach(val => {
        pics=[...pics,{thumbnail:'http://rockgym.ro/auth/pozeApp/thumbs/'+val,original:'http://rockgym.ro/auth/pozeApp/pics/'+val  }];
     })
      
    
    resolve(pics);
    
    
    }) .catch(function (error) {


          reject(error);
        });


    })

  }

   




   getpics().then(data=> {
      setPics(data);
      
    }).catch(function (error) {
      console.log(error);
    })
  
    //console.log(pics);


    
  return (
    <Layout>
      <TopNav
       backgroundColor={themeColor.black400}
       borderColor={themeColor.black100}
        middleContent={Language["ro"][31]}
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <SafeAreaView style={styles.root}>
        <ImageList
          images={pics.slice(0,pics.length*0.25).map((image) => image.thumbnail)}
          onPress={(index) => onSelect(pics, index)}
          shift={0.25}
        />
        <ImageList
          images={pics.slice(pics.length*0.25,pics.length*0.5).map((image) => image.thumbnail)}
          onPress={(index) => onSelect(pics,pics.length*0.25+index)}
          shift={0.25}
        />
        <View style={styles.about}>
          <Image
            resizeMode="contain"
            style={{
              height: 200,
              width: 350,
            }}
            source={require("../../assets/logoapp.png")}
          />
        </View>
        <ImageViewing
           images={getImageSource(pics)}
          
          imageIndex={currentImageIndex}
          presentationStyle="overFullScreen"
          visible={isVisible}
          onRequestClose={onRequestClose}
        //  onLongPress={onLongPress}
          FooterComponent={({ imageIndex }) => (
            <ImageFooter imageIndex={imageIndex} imagesCount={pics.length} />
          )}
        />
        <ImageList
          images={pics.slice(pics.length*0.5,pics.length*0.75).map((image) => image.thumbnail)}
          onPress={(index) => onSelect(pics, pics.length*0.5+index)}
          shift={0.25}
        />

        <ImageList
          images={pics.slice(pics.length*0.75,pics.length).map((image) => image.thumbnail)}
          onPress={(index) => onSelect(pics,pics.length*0.75+ index)}
          shift={0.25}
        />
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
    ...Platform.select({
      android: { paddingTop: StatusBar.currentHeight },
      default: null,
    }),
  },
  about: {
    flex: 1,
    marginTop: -12,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "200",
    color: "#FFFFFFEE",
  },
});


