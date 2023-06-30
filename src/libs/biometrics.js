import * as LocalAuthentication from 'expo-local-authentication';

const check = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    return compatible
}

const isEnabled = async() => {

}

const authenticate = async () => {
    return new Promise(async resolve => {
        let result = await LocalAuthentication.authenticateAsync()
        resolve(result)
    })
}

module.exports = {
    check,
    isEnabled,
    authenticate
}