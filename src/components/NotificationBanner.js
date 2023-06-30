import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { GlobalStyles } from '../styles/global'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CreditCard = ({ error }) => {
  const insets = useSafeAreaInsets();

  if (error) {
    return (
      <View style={[GlobalStyles.toast, {paddingTop: insets.top}]}>
          <StatusBar style="light" />
          <Text style={GlobalStyles.toastText}>{JSON.parse(error).error}</Text>
      </View>
    )
  }
  return (
    <View style={[{paddingTop: insets.top, paddingLeft: 20, paddingBottom: 20, justifyContent: 'flex-end'}]}>
    </View>
  );
}


export default CreditCard