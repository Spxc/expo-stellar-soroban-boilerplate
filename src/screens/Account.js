
import { StatusBar } from 'expo-status-bar'
import { Animated, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'

import soroban from '../libs/soroban'
import Storage from '../libs/storage'
import Convert from '../libs/currency'

import CreditCard from '../components/CreditCard'
import AccountCard from '../components/AccountCard'
import NotificationBanner from '../components/NotificationBanner'

import { HomeStyles, GlobalStyles } from '../styles/global'
import { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import ListItem from '../components/ListItem';
import { sampleToken } from '../libs/tokens'
import GradientButton from '../components/ui/GradientButton'
import { Updates } from 'expo';
import SettingsCard from '../components/ui/cards/SettingsCard'
import Biometrics from '../../src/libs/biometrics'


const AccountScreen = (props) => {
    const [error, setError] = useState(false)

    const [account, setAccount] = useState()
    const insets = useSafeAreaInsets();

    const [biometrics, setBiometrics] = useState()
    const [biometricsSupported, setBiometricsSupported] = useState()

    useEffect(() => {
      
        /**
         * Load account
         */
        Storage.read("account")
        .then(async keypair => {
          
          try {
            let account = await soroban.getAccount(keypair.publicKey)
            setAccount(account)
          } catch (error) {
            setError(error)
          }
          let hardwareCheck = await Biometrics.check()
          if (!hardwareCheck) {
            setBiometricsSupported(false)
            return
          }
          setBiometricsSupported(true)

          let security = await Storage.read("security")
          setBiometrics(security)
        })
        .catch(error => {
          setError(error)
      })
    }, [])

    const toggleSwitch = async (value) => {
      
      
      if (!value) {
        let auth = Biometrics.authenticate()
        if (auth.error) {
          return
        }
        setBiometrics(value)
        await Storage.remove("security")
        return
      }
      
      setBiometrics(value)
      await Storage.save("security", value)
      
    };

    const logout = async () => {
      try {
        props.route.params.callback()
        await Storage.clear()
      } catch (error) {
        alert(error)
      }
      
    }

  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, height: '100%', justifyContent: 'space-between'}}>
            <StatusBar style="auto" />
            <View style={{padding: 20, paddingTop: insets.top, }}>
              <AccountCard account={account} />
              <SettingsCard
                text={"Biometric security"}
                rightCol={
                  <Switch
                  disabled={biometricsSupported ? false : true}
                  style={{ margin: 0, padding: 0 }}
                  onValueChange={toggleSwitch}
                  value={biometrics}
                />
                }
              />

             
            </View>
            <View style={{padding: 20, paddingBottom: insets.top, }}>
              <GradientButton 
              text={"Logout"}
              gradient={['#fc3d39', '#d92f2b', '#fc3158']}
              onPressCallback={logout} />

            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default AccountScreen