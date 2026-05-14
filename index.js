require('dotenv').config();
const axios = require('axios');

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur';

async function run() {
    console.log('[INFO] service=btc-bot Cron job started.');
    
    try {
        const response = await axios.get(API_URL);
        const price = response.data.bitcoin.eur;
        const message = {
            content: `🚀 BTC Price: **${price} EUR**`
        };

        await axios.post(WEBHOOK_URL, message);
        console.log(`[INFO] service=btc-bot BTC: ${price} EUR. Sent to Discord.`);
    } catch (error) {
        console.error(`[ERROR] service=btc-bot API error: ${error.message}`);
    }
}

run();