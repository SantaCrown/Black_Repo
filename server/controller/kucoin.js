// kucoin.js
const Kucoin = require('kucoin-node-sdk');
require('dotenv').config();

Kucoin.init({
    baseUrl: 'https://api.kucoin.com', // You can switch to sandbox environment if needed
    apiAuth: {
        key: process.env.KUCOIN_API_KEY,
        secret: process.env.KUCOIN_API_SECRET,
        passphrase: process.env.KUCOIN_API_PASSPHRASE,
    },
});

async function validateKuCoinAPI() {
    try {
        const accounts = await Kucoin.rest.User.Account.getAccountsList();
        console.log('API Key is valid. Account data:', accounts);
        return accounts;
    } catch (error) {
        console.error('Invalid API Key or Secret:', error.message);
        throw new Error('API Key validation failed');
    }
}

module.exports = { validateKuCoinAPI };
