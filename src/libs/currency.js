import axios from "axios"

const fromNative = async (token_amount, fiat_code) => {
    return new Promise(async resolve => {
        let sresponsePrice, sresponsePriceTemp

        // switch(fiat_code) {
        //     case "USD":
        //         sresponsePriceTemp = await axios.get("https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum4&counter_asset_code=USDC&counter_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN&limit=1&order=desc")
        //     break
        //     case "EUR":
        //         sresponsePriceTemp = await axios.get("https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum4&counter_asset_code=EURC&counter_asset_issuer=GAP2JFYUBSSY65FIFUN3NTUKP6MQQ52QETQEBDM25PFMQE2EEN2EEURC&limit=1&order=desc")
        //     break
        //     case "GBP":
        //         sresponsePriceTemp = await axios.get("https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum4&counter_asset_code=GBPC&counter_asset_issuer=GDXF6SYWIQOKOZ7BACXHBFBLQZEIH25KOTTLWQK35GO3JKRNIFHHGBPC&limit=1&order=desc")
        //     break
        //     case "CAD":
        //         sresponsePriceTemp = await axios.get("https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum4&counter_asset_code=USDC&counter_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN&limit=1&order=desc")
        //     break
        //     default:
        //         sresponsePriceTemp = await axios.get("https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum4&counter_asset_code=USDC&counter_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN&limit=1&order=desc")
        //     break
        // }

        sresponsePriceTemp = await axios.get("https://horizon.stellar.org/trades?base_asset_type=native&counter_asset_type=credit_alphanum4&counter_asset_code=USDC&counter_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN&limit=1&order=desc")
        sresponsePrice = sresponsePriceTemp.data
        
        const scurrentPriceD = sresponsePriceTemp.data._embedded.records[0].price.d
        const scurrentPriceN = sresponsePriceTemp.data._embedded.records[0].price.n
        
        let sfinalPrice = scurrentPriceN/scurrentPriceD

        const dollarPrice = sfinalPrice

        if (fiat_code == "CAD") {
            let { data } = await axios.get('https://www.bankofcanada.ca/valet/observations/FXCADUSD/json?recent=1')
            var multiplierCAD = parseFloat(data.observations[0]['FXCADUSD'].v)
            return parseFloat((sfinalPrice*multiplierCAD)).toFixed(8) * token_amount
        }
        resolve(parseFloat(dollarPrice).toFixed(8) * token_amount)
    })
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

module.exports = {
    fromNative,
    currencyFormatter
}