import { CardStyle } from '../../../styles/global'

import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

const SettingsCard = ({ text, rightCol }) => {

  return (
      <LinearGradient
        colors={ ['#7932F4', '#5924F1', '#6410F5'] }
        style={[CardStyle.container, {minHeight: 80, marginTop: 10}]}
        end={{ x: 0.1, y: 0.9 }}
      >
        <Animated.View>
          <View style={CardStyle.topContainer}>
            <View>
              <Text style={CardStyle.topText}>{text}</Text>
              <View style={[CardStyle.bottomContainer, {justifyContent: 'flex-start'}]}>
                <Text style={[CardStyle.bottomText, {marginLeft: 0}]}>Face / TouchID</Text>
              </View>
            </View>
            <View style={CardStyle.switch}>
              {rightCol}
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
  );
}


export default SettingsCard