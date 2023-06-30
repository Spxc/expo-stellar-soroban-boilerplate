import "./shim";
import soroban from './src/libs/soroban'

import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from "./src/screens/Home";
import AccountScreen from "./src/screens/Account";
import { useEffect, useState } from "react";
import Storage from "./src/libs/storage"
// import AuthScreen from "./src/screens/Auth";
import { AuthStyle, GlobalStyles, ModalStyle, CardStyle } from './src/styles/global'
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import Biometrics from './src/libs/biometrics'

export default function App() {
  const [biometrics, setBiometrics] = useState()
  const [account, setAccount] = useState()
  const [modalStatus, setModalStatus] = useState()
  const [isAuthenticated, setAuthtenticated] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [triggerTopUpdate, setTriggerTopUpdate] = useState()

  const Stack = createNativeStackNavigator();
  
  const AuthNavigator = () => {
    const [accountKey, setAccountKey] = useState()

    return (
        <LinearGradient
        colors={ error ? ['#fc3d39', '#d92f2b', '#fc3158'] : ['#7932F4', '#5924F1', '#6410F5'] }
        style={{width: '100%', flex: 1, justifyContent: 'center'}}
        end={{ x: 0.1, y: 0.9 }}>
          <View style={{paddingTop: 100, padding: 20}}>
            <Text style={AuthStyle.headerText}>StashApp.</Text>
            <Text style={AuthStyle.subText}>FUTURENET - SOROBAN</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={[AuthStyle.button, {marginBottom: 20}]}>
                <TextInput value={accountKey} onChangeText={setAccountKey} placeholder={"Keyphrase"} secureTextEntry={true} style={{width: '100%', fontSize: 18}} />
              </View>
              <TouchableOpacity style={{marginLeft: 20, marginTop: 10}} onPress={() => {importAccount(accountKey)}}>
                  <View style={CardStyle.button}>
                    <AntDesign name="arrowright" size={24} color="#fff" />
                  </View>
              </TouchableOpacity>
            </View>
            <View style={{height: 20}}>
              <Text style={[AuthStyle.btnText, {color: '#fff'}]}>{error && error}</Text>
            </View>
          </View>

          <View style={{padding: 20, marginTop: 140, justifyContent: 'flex-end', flex: 0.4}}>
            <TouchableOpacity onPress={() => {setModalStatus("create")}}>
              <View style={AuthStyle.button}>
                <Text style={AuthStyle.btnText}>Create account</Text>
                <AntDesign name="arrowright" size={24} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
    )
  }
  
  const AuthScreen = (props) => {
    const [account, setAccount] = useState()

    useEffect(() => {
        
    }, [])

    const authenticate = async () => {
      let auth = await Biometrics.authenticate()

      if (auth.error) {
        setAuthtenticated(false)
        return
      }
      setAuthtenticated(true)
    }

  return (
      <LinearGradient
      colors={ error ? ['#fc3d39', '#d92f2b', '#fc3158'] : ['#7932F4', '#5924F1', '#6410F5'] }
      style={{width: '100%', flex: 1, paddingTop: 100, paddingBottom: 120, justifyContent: 'space-between', alignItems: 'center'}}
      end={{ x: 0.1, y: 0.9 }}>
        <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
          <Text style={[GlobalStyles.headerText, {color: "#fff"}]}>Please authenticate</Text>
        </View>
        <View style={{flex: 0.5, paddingTop: 40, justifyContent: 'flex-start'}}>
          <TouchableOpacity onPress={() => {authenticate()}}>
            <Ionicons name="finger-print" size={60} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
  )
}

  const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    
    const updateAccountState = (state) => {
      setAccount(state)
    }

    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" initialParams={{account: account}} component={HomeScreen} />
        <Tab.Screen name="Account" initialParams={{account: account, callback: updateAccountState}} component={AccountScreen} />
      </Tab.Navigator>
    );
  }

  const Loading = () => {
    return (
      <LinearGradient
        colors={ error ? ['#fc3d39', '#d92f2b', '#fc3158'] : ['#7932F4', '#5924F1', '#6410F5'] }
        style={{width: '100%', alignItems: 'center', flexDirection: 'column', flex: 1, justifyContent: 'center'}}
        end={{ x: 0.1, y: 0.9 }}>
          <Text style={[GlobalStyles.headerText, {marginBottom: 40, color: "#fff"}]}>StashApp</Text>
          <ActivityIndicator
          textContent={"Loading..."} />
        </LinearGradient>
    )
  }

  const createAccount = async () => {
    let keypair = soroban.generateRandomKeypair()
    /** 
     * TODO: Add encryption into the library
     */ 
    try {
      await axios.get(`https://friendbot-futurenet.stellar.org/?addr=${keypair.publicKey()}`)
      await Storage.save("account", {secretKey: keypair.secret(), publicKey: keypair.publicKey()})
      setAccount(keypair)  
      setModalStatus(false)
    } catch (error) {
      console.log(error)
    }
    
  }

  const importAccount = async (accountKey) => {
    setError(false)
    if (!/^S[0-9A-Z]{55}$/.test(accountKey)) {
      setError("Invalid secret")
      return
    }
    setModalStatus("import")
    setTimeout(async() => {
      let keypair = await soroban.getKeysFromSecret(accountKey)
    
      /** 
       * TODO: Add encryption into the library
       */ 
      await Storage.save("account", {secretKey: keypair.secret(), publicKey: keypair.publicKey()})
      setAccount(keypair)  
      setModalStatus(false)
    }, 5000)
}

  useEffect(() => {
    setLoading(true)
    Storage.read("account")
    .then(async account => {
      if (account == null || !account.secretKey) {
        setLoading(false)
        return setAccount(false)
      }
      setAccount(account)

      /**
       * Check to see if biometrics is enabled
       * if == true: present auth screen
       */
      let security = await Storage.read("security")
      if (security == null) {
        setBiometrics(true)
        setAuthtenticated(true)
        setLoading(false)
        return
      }

      setBiometrics(true)
      setLoading(false)
      
    })
    .catch(error => {
      console.log(error)
      setLoading(false)
      setAccount(false)
    })
  }, [])

  const Modal = ({status, secret}) => {
    const windowHeight = Dimensions.get('window').height
    const animated = new Animated.Value(windowHeight)
  
    useEffect(() => {
      if (!status) {
        Animated.spring(
          animated,
          {
            toValue: windowHeight,
            velocity: 3,
            tension: 2,
            friction: 8,
            duration: 500,
            useNativeDriver: false
          }
        ).start()
        return
      }
  
      Animated.spring(
        animated,
        {
          toValue: 0,
          velocity: 3,
          tension: 2,
          friction: 8,
          duration: 500,
          useNativeDriver: false
        }
      ).start()
  
      setTimeout(() => {
        if (status == "import") {
          return
        }
        createAccount()
      }, 3000)
    }, [status])
  
    const close = () => {
      Animated.spring(
        animated,
        {
          toValue: windowHeight,
          velocity: 3,
          tension: 2,
          friction: 8,
          duration: 500,
          useNativeDriver: false
        }
      ).start()
    }
  
    if (!status) {
      return (
        <></>
      )
    }
    return (
      <Animated.View style={[ModalStyle.backdrop, {transform: [{translateY: animated}]}]}>
        <View style={ModalStyle.container}>
          <View style={ModalStyle.top}>
            <TouchableOpacity onPress={close}>
              <AntDesign name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          <ActivityIndicator />
          <Text style={{marginTop: 20, fontWeight: '600'}}>{status == "import" ? "Importing account" : "Creating account"}</Text>
        </View>
      </Animated.View>
    )
  }

  return (
      <NavigationContainer>
        {!loading ?
          (biometrics && isAuthenticated) ?
            !account ?
              <AuthNavigator />
            :
              <TabNavigator />
            :
            <AuthScreen />
          :
            <Loading />
        }
        <Modal status={modalStatus} secret={"123"} />
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
