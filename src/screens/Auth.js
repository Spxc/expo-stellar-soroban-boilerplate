
import { Text, TouchableOpacity, View } from 'react-native';
import Biometric from '../libs/biometrics'

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
  } from 'react-native-safe-area-context';

import { HomeStyles } from '../styles/global'
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const AuthScreen = (props) => {
    const [account, setAccount] = useState()
    const router = useRouter();
    useEffect(() => {
        
    }, [])

    const authenticate = () => {
      let auth = Biometric.authenticate()
      alert(auth)
      if (!auth) {
        return
      }

      props.params.callback()
    }

  return (
    <SafeAreaView style={HomeStyles.container}>
        <TouchableOpacity onPress={() => {authenticate()}}>
            <Text>Please authenticate</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}


export default AuthScreen