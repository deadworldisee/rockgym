import React, { createContext, useState, useEffect,useContext } from "react";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null ) {
      
      return data;
    }
  } catch (error) {
    
    console.log(error);
  }
};



const AuthContext = createContext();
const AuthProvider = (props) => {

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  
  

 // console.log(auth);


  getData('cont').then(data=>{
    //console.log('awdawdawd');
    
    if(JSON.parse(data))
    {
    let allData=JSON.parse(data);
   // console.log(allData.woocommerce_meta);
     if(typeof  allData.id =='number')
     {
     setAuth(true);
     setUser(true);
     }
     else
     {
       setAuth(false);
       setUser(false);    
     }
    }
     // navigation.navigate('Main');
     //console.log(data);
   });

  
 // console.log(info);

      const signIn =  () => {
        setAuth(true);
        setUser(true);
          
      }

      const signOut =  () => {
        setAuth(false);
        setUser(false);
         AsyncStorage.removeItem('cont');
          
      }






  
  //console.log(auth);

  

  

  useEffect(() => {
      
    checkLogin();
  }, []);

  function checkLogin() {
    
      if (auth) {
        setUser(true);
        // getUserData();
      } else {
        setUser(false);
        // setUserData(null);
      }
    ;
  }

  return (
    <AuthContext.Provider
      value={{
        user,signIn,signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}



export { AuthContext, AuthProvider,getData,useAuth };
