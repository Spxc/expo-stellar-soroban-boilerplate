import { StyleSheet, Text, View } from 'react-native';

const GlobalStyles = StyleSheet.create({
    container: {
      
    },
    h2: {
        fontSize: 20,
        fontWeight: '600'
    },  
    toast: {
        width: '100%',
        backgroundColor: '#fc3d39',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        marginBottom: 20
    },
    toastText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: '600'
    },
    headerText: {
        fontSize: 30,
        fontWeight: '600'
    }
});

const HomeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const AccountStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const CardStyle = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 20,
      borderRadius: 15,
      elevation: 1, 
      justifyContent: 'space-between',
      shadowColor: '#171717', 
      shadowOffset: {width: 2, height: 2}, 
      shadowOpacity: 0.2, 
      shadowRadius: 8
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    bodyContainer: {
        justifyContent: 'center',
        marginBottom: 40
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    topText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: '600'
    },
    topTextSub: {
        color: "#fff",
        fontSize: 10,
        fontWeight: '600'
    },
    bodyText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: '600',
    },
    bodySmallText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: '600',
    },
    bottomText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'right'
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: '#fff',
        marginRight: 4,
        marginTop: 1
    },
    dotSpacer: {
        width: 4
    },
    button: {
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: 'rgba(250, 250, 250, 0.2)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    switch: {
        padding: 0,
        backgroundColor: 'rgba(250, 250, 250, 0.2)',
        borderRadius: 50
    }
});

const ListStyle = StyleSheet.create({
    container: {
      width: '100%',
      padding: 15,
      borderRadius: 15,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 20,
      overflow: 'hidden'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600'
    },
    subText: {
        fontSize: 14,
        fontWeight: '400'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

const AuthStyle = StyleSheet.create({
    container: {
      width: '100%',
      padding: 15,
      borderRadius: 15,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 20,
      overflow: 'hidden'
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        flex: 1,
        minHeight: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 42,
        fontWeight: '600',
        color: '#fff',
        
    },
    subText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 20
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

const ModalStyle = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        position: 'absolute',
        bottom: 0,
        height: 200,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 20,
        borderRadius: 15
    },
    top: {
        height: 50,
        width: '100%',
        alignItems: 'flex-end'
    }
});

module.exports = {
    GlobalStyles,
    HomeStyles,
    AccountStyles,
    CardStyle,
    ListStyle,
    AuthStyle,
    ModalStyle
}