
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/provider/AuthProvider";
import { ThemeProvider } from "react-native-rapi-ui";
import { LogBox } from "react-native";



export default function App() {
  console.log("App component loaded");
  
  const images = [
    require("./assets/icon.png"),
    require("./assets/splash.png"),
    require("./assets/loginPic.png"),
    require("./assets/register.png"),
    require("./assets/forget.png"),
    require("./assets/logoapp.png"),
  ];

  // Ignore firebase v9 AsyncStorage warning
  React.useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ]);
  }, []);

  return (
    <ThemeProvider images={images} theme='dark'>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
