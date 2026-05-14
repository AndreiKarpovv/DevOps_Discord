import dotenv from 'dotenv';
dotenv.config();

// Функция для одного прохода логики
async function monitor() {
    try {
        console.log('Проверяю курс BTC...');
        // ТВОЯ ЛОГИКА ТУТ:
        // 1. Запрос к API (например, Binance или CoinGecko)
        // 2. Сравнение цены
        // 3. Отправка в Discord через axios/node-fetch
        
        console.log('Данные отправлены успешно');
    } catch (error) {
        console.error('Ошибка в цикле мониторинга:', error.message);
    }
}

// Главная функция с циклом
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