import dotenv from 'dotenv';
import axios from 'axios'; // Добавили импорт axios
dotenv.config();

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur';

// Переименовал в monitor, чтобы совпадало с вызовом в цикле
async function monitor() {
    console.log('[INFO] Checking BTC price...');
    
    try {
        const response = await axios.get(API_URL);
        const price = response.data.bitcoin.eur;
        const message = {
            content: `🚀 BTC Price: **${price} EUR**`
        };

        await axios.post(WEBHOOK_URL, message);
        console.log(`[INFO] BTC: ${price} EUR. Sent to Discord.`);
    } catch (error) {
        console.error(`[ERROR] API or Webhook error: ${error.message}`);
    }
}

async function start() {
    console.log('Бот запущен и работает в бесконечном цикле...');
    
    while (true) {
        await monitor();
        
        // Интервал 1 минута
        const interval = 60 * 1000; 
        console.log(`[WAIT] Sleeping for ${interval / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, interval));
    }
}

start();