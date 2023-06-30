import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import Convert from '../libs/currency'


import { CardStyle } from '../styles/global'
import { useState } from 'react';

const CreditCard = ({account, error, scrollY}) => {
  

  const HEADER_MAX_HEIGHT = 150;
  const HEADER_MIN_HEIGHT = 40;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
});

const headerBody = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
});

  return (
      <LinearGradient
        colors={ error ? ['#fc3d39', '#d92f2b', '#fc3158'] : ['#7932F4', '#5924F1', '#6410F5'] }
        style={CardStyle.container}
        end={{ x: 0.1, y: 0.9 }}
      >
        <Animated.View style={{height: headerHeight}}>
          <View style={CardStyle.topContainer}>
            <View>
              <Text style={CardStyle.topText}>Soroban</Text>
              <Text style={CardStyle.topTextSub}>FUTURENET</Text>
            </View>
            {!isNaN(parseFloat(account?.balance)) &&
              <TouchableOpacity>
                <View style={CardStyle.button}>
                  <AntDesign name="arrowright" size={24} color="#fff" />
                </View>
              </TouchableOpacity>
            }
          </View>
          <View style={CardStyle.bodyContainer}>
            {!error ?
              <Text style={CardStyle.bodyText}>{account?.balance ? Convert.currencyFormatter.format(account?.balance) : "$00.00"}</Text>
            :
              <Text style={CardStyle.bodyText}>Please activate</Text>
            }
          </View>
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
          {/* <Text>{JSON.stringify(scrollY)}</Text> */}
        </Animated.View>
      </LinearGradient>
  );
}


export default CreditCard