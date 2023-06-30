let tokens = [
    {
        asset_code: "USDC",
        asset_issuer: "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
    },
    {
        asset_code: "AQUA",
        asset_issuer: "GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA"
    },
    {
        asset_code: "CANNACOIN",
        asset_issuer: "GBLJ4223KUWIMV7RAPQKBA7YGR4I7H2BIV4KIMMXMQWYQBOZ6HLZR3RQ"
    },
    {
        asset_code: "AQUA",
        asset_issuer: "GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA"
    },
    {
        asset_code: "CANNACOIN",
        asset_issuer: "GBLJ4223KUWIMV7RAPQKBA7YGR4I7H2BIV4KIMMXMQWYQBOZ6HLZR3RQ"
    }
]

const sampleToken = (index) => {
    try {
        let token = tokens[index]
        token.balance = Math.floor(Math.random() * 99999)
        return token
    } catch (error) {
        let token = tokens[0]
        token.balance = Math.floor(Math.random() * 99999)
        return token
    }
    
}

module.exports = { sampleToken }