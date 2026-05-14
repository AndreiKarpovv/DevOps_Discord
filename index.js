import dotenv from 'dotenv';
dotenv.config();

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
async function start() {
    console.log('Бот запущен...');
    while (true) {
        await monitor();
        
        // Ждем 1 минуту перед следующим разом (60 000 мс)
        // Не ставь слишком мало, иначе API тебя заблокирует
        const interval = 60 * 1000; 
        await new Promise(resolve => setTimeout(resolve, interval));
    }
}

start();