import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image'
import { StatusBar } from 'expo-status-bar'
import { GlobalStyles, ListStyle, CardStyle } from '../styles/global'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AntDesign } from '@expo/vector-icons'; 



const ListItem = ({ asset }) => {
    const blurhash = ''

  return (
    <TouchableOpacity key={asset?.asset_code ? asset?.asset_code : "Lumens"}>
        <View style={ListStyle.container}>
            <View style={ListStyle.leftContainer}>
                <Image
                    source={asset?.asset_code ? {uri: `https://litemint.azureedge.net/userdata/original-${asset?.asset_code}-${asset?.asset_issuer}-256.png`} : {uri: "https://s2.coinmarketcap.com/static/img/coins/200x200/512.png"}}
                    placeholder={blurhash}
                    style={{height: 35, width: 35, borderRadius: 50, marginRight: 20}}
                    contentFit="cover"
                    transition={500}
                />
                <View>
                    <Text style={ListStyle.headerText}>{asset?.asset_code ? asset?.asset_code : "Lumens"}</Text>
                    <Text style={ListStyle.subText}>{asset?.balance}</Text>
                </View>
            </View>
            <View style={ListStyle.rightContainer}>
                <AntDesign name="arrowright" size={24} color="#000" />
            </View>
        </View>
    </TouchableOpacity>
  );
}


export default ListItem