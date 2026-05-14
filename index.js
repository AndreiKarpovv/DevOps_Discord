import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur';

async function monitor() {
    try {
        console.log('[INFO] Checking BTC price...');
        const response = await axios.get(API_URL);
        const price = response.data.bitcoin.eur;
        
        await axios.post(WEBHOOK_URL, {
            content: `🚀 BTC Price: **${price} EUR**`
        });
        console.log(`[INFO] Sent to Discord: ${price} EUR`);
    } catch (error) {
        // Если ловим 429, выводим понятное сообщение
        if (error.response && error.response.status === 429) {
            console.error('[WARN] Too many requests. API temporary blocked us.');
        } else {
            console.error(`[ERROR] ${error.message}`);
        }
    }
}

async function start() {
    console.log('Бот запущен...');
    while (true) {
        await monitor();
        // Ждем 10 минут (600 000 мс), чтобы блокировка 429 точно снялась
        console.log('[WAIT] Sleeping for 10 minutes...');
        await new Promise(resolve => setTimeout(resolve, 600000));
    }
}

start();