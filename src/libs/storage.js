import * as SecureStore from 'expo-secure-store';


const save = async (key, value) => {
    return new Promise(async resolve => {
        const jsonValue = JSON.stringify(value);
        try {
            resolve(await SecureStore.setItemAsync(key, jsonValue));
        } catch (error) {
            console.log(error)
        }
    })
    
}

const read = async (key) => {
    return new Promise(async resolve => {
        try {
            const jsonValue = await SecureStore.getItemAsync(key)
            return resolve(jsonValue != null ? JSON.parse(jsonValue) : null)
        } catch (error) {
            console.log(error)
        }
    })
}
const remove = async (key) => {
    return new Promise(async resolve => {
        resolve(await SecureStore.deleteItemAsync(key))
    })
}

const clear = async () => {
    return new Promise(async resolve => {
        resolve(await SecureStore.deleteItemAsync("account"))
    })
}

module.exports = {
    save,
    read,
    remove,
    clear
}