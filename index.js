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
        console.log(`[INFO] BTC: ${price} EUR. Sent to Discord.`);
    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
    }
}

async function start() {
    console.log('Бот запущен...');
    while (true) {
        await monitor(); // Выполняем проверку цены
        
        console.log('[WAIT] Ждем 5 минут перед следующей проверкой...');
        // 300 000 мс = 5 минут. Для CoinGecko это безопасный интервал.
        await new Promise(resolve => setTimeout(resolve, 300000)); 
    }
}

start();