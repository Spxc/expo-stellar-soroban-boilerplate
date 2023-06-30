import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';


import { CardStyle } from '../styles/global'

const AccountCard = ({ account }) => {

  return (
      <LinearGradient
        colors={ ['#7932F4', '#5924F1', '#6410F5'] }
        style={[CardStyle.container, {minHeight: 80}]}
        end={{ x: 0.1, y: 0.9 }}
      >
        <Animated.View>
          <View style={CardStyle.topContainer}>
            <View>
              <Text style={CardStyle.topText}>Soroban</Text>
              <View style={CardStyle.bottomContainer}>
                <View style={CardStyle.dot} />
                <View style={CardStyle.dot} />
                <View style={CardStyle.dot} />
                <View style={CardStyle.dotSpacer} />
                <View style={CardStyle.dot} />
                <View style={CardStyle.dot} />
                <View style={CardStyle.dot} />
                <Text style={[CardStyle.bottomText, {marginLeft: 4}]}>{account?.account?._accountId?.slice(50)}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={async() => {
              await WebBrowser.openBrowserAsync('https://futurenet.steexp.com/account/GCDU6USHPKLZGIBYNLCZM7KRUVWLCUUHTTAS7YJWJ5MXFVWZNKTNH3WX')
            }}>
              <View style={[CardStyle.button]}>
                <AntDesign name="arrowright" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
  );
}


export default AccountCard