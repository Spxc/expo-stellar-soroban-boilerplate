import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 


import { CardStyle } from '../../styles/global'

const GradientButton = ({ text, gradient, onPressCallback }) => {

  return (
    <TouchableOpacity onPress={onPressCallback}>
      <LinearGradient
        colors={ gradient }
        style={[CardStyle.container, {minHeight: 60}]}
        end={{ x: 0.1, y: 0.9 }}
      >
        <Text style={[CardStyle.bodyText, {fontSize: 18}]}>{text}</Text>
      </LinearGradient>
      </TouchableOpacity>
  );
}


export default GradientButton