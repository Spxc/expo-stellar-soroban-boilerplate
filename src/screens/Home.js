
import { StatusBar } from 'expo-status-bar'
import { Animated,TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'

import soroban from '../libs/soroban'
import Storage from '../libs/storage'
import Convert from '../libs/currency'

import CreditCard from '../components/CreditCard'
import NotificationBanner from '../components/NotificationBanner'

import { HomeStyles, GlobalStyles } from '../styles/global'
import { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import ListItem from '../components/ListItem';
import { sampleToken } from '../libs/tokens'

const HomeScreen = (props) => {
    const [error, setError] = useState(false)
    const [refreshing, setRefreshing] = useState()

    const [account, setAccount] = useState()
    const insets = useSafeAreaInsets();
    const [scrollY] = useState(new Animated.Value(0))

    useEffect(() => {
        /**
         * Load account
         */
        Storage.read("account")
        .then(async keypair => {
            try {
                let account = await soroban.getAccount(keypair.publicKey)
                /**
                 * Filter out non native assets (XLM)
                 * TODO: Add support to sum up all assets and show
                 *       the fiatbalance
                 */
                let lumens = account.balances.filter(a => a.asset_type == "native")[0]
                try {
                    let balance = await Convert.fromNative(lumens.balance, "USD")
                    account.balance = balance
                    setAccount(account)
                } catch (error) {
                    setError(JSON.stringify(error))
                    setAccount(account)
                }
            } catch (error) {
                setError(JSON.stringify(error))
            }
        })
        .catch(error => {
            setError(error)
        })
    }, [])

    const useRefresh = () => {
        setRefreshing(true)
        setError(false)
        Storage.read("account")
        .then(async keypair => {
            try {
                let account = await soroban.getAccount(keypair.publicKey)
                /**
                 * Filter out non native assets
                 */
                let lumens = account.balances.filter(a => a.asset_type == "native")[0]
                try {
                    let balance = await Convert.fromNative(lumens.balance, "USD")
                    account.balance = balance
                    setAccount(account)
                    setRefreshing(false)
                } catch (error) {
                    setError(JSON.stringify(error))
                    setAccount(account)
                    setRefreshing(false)
                }
                
            } catch (error) {
                setError(JSON.stringify(error))
                setRefreshing(false)
            }
        })
        .catch(error => {
            setError(error)
        })
    }

  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <StatusBar style="auto" />
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={useRefresh}
                />}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {useNativeDriver: false})}
                contentContainerStyle={{padding: 20, paddingTop: insets.top}}>
                
                {/* Top card which holds balance */}
                <View style={{width: '100%', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, backgroundColor: '#F2F2F2'}}>
                    <CreditCard account={account} error={error} scrollY={scrollY} />
                </View>
                <Text style={[GlobalStyles.h2, {marginTop: 40, marginBottom: 20}]}>Assets</Text>

                {/* List out account assets (tokens) */}
                {account?.balances?.map((asset, index) => (
                    <ListItem asset={asset} key={index} />
                ))}

                {/* Random array to fill up ScrollView */}
                {Array.apply(null, { length: 8 }).map((e, i) => (
                        <ListItem asset={sampleToken(i)} key={i} />
                ))}
                
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}


export default HomeScreen