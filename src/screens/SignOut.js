import React from 'react';
import { View,Image,ImageBackground,StyleSheet } from 'react-native';
import {
	Layout,
	Button,
	Text,

	Section,
	SectionContent,
	
  } from "react-native-rapi-ui";
import Language from './utils/Language';
import { useAuth } from "../provider/AuthProvider";


export default function ({  }) {
	const auth = useAuth();


	return (
		<Layout  >
   
		<ImageBackground
	  source={require("../../assets/The-Rock-Gym-1079-scaled.jpg")}
	  style={styles.backgroundImage}
	>
				<Image
              resizeMode="contain"
             
              style={{
                height:200,
                width: 350,
              }}
              source={require("../../assets/logoapp.png")}
            />
		  <View
			style={{
			  
			  alignItems: "center",
			  justifyContent: "center",
			  marginHorizontal: 20,
			}}
		  >

	
			<Section style={{opacity:0.75}}>



			  <SectionContent style={{backgroundColor:'#000'}}>
				<Text fontWeight="bold" style={{ textAlign: "center" }}>
				  {Language['ro'][29]}
				</Text>
	

				<Button
				  status="danger"
				  text={Language['ro'][28]}
				  onPress={() => {
					auth.signOut();
				  }}
				  style={{
					marginTop: 10,
				  }}
				/>
				
			  </SectionContent>
			</Section>
		  </View>
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