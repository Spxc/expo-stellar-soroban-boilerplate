import axios from 'axios';
import * as Random from 'expo-crypto';

const SorobanClient = require('soroban-client');
const server = new SorobanClient.Server('https://rpc-futurenet.stellar.org', { allowHttp: true })


/**
 * Generate a new set of wallet keys
 * @returns `<KeyPair>Object`
 */
const generateRandomKeypair = () => {
  const randomBytes = Random.getRandomBytes(32);

  return SorobanClient.Keypair.fromRawEd25519Seed(Buffer.from(randomBytes));

};

/**
 * 
 * @param {*} account Public Soroban key
 * @returns `<Promise>Array`
 */
const loadAccount = async(account) => {
  try {
      // const _account = await server.getAccount(Buffer.from(account));
      const _account = new SorobanClient.Account(account, "0");
      console.log("account:", _account)

      let ledger = await server.getLatestLedger()
      _account.ledger = ledger
      
      return _account
  } catch (error) {
      // alert(JSON.stringify(error))
  } 
}

/**
 * Get ledger events
 * @param {*} account `<loadAccount>Object`
 * @returns `<Promise>Object`
 */
const getEvents = async (account) => {
  return new Promise((resolve, reject) => {
    server.getEvents({"startLedger": account.ledger.sequence || 0, filters: []})
    .then(response => {
        console.log(response)
        return resolve(response)
    })
    .catch(error => {
        return resolve([])
    })
  })
}

/**
 * Get account data including balanace
 * @param {*} account Public Soroban key
 * @returns `<Promise>Array`
 */
const getAccount = async (account) => {
  return new Promise(async (resolve, reject) => {
    let accountObject = await loadAccount(account) 
    
    axios.get(`https://horizon-futurenet.stellar.org/accounts/${account}`)
    .then(response => {
      let data = response.data
      data.account = accountObject
      return resolve(data)
    })
    .catch(error => {
      return reject({type: "events", error: "Failed to fetch account"})
    })
  })
}

const createAccount = async () => {
  return new Promise((resolve, reject) => {
    
  })
}

const getKeysFromSecret = (secret) => {
  return new Promise((resolve, reject) => {
    resolve(SorobanClient.Keypair.fromSecret(secret))
  })
}

module.exports = { 
  getAccount,
  loadAccount,
  getEvents,
  generateRandomKeypair,
  getKeysFromSecret
}