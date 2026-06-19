// bot.js — Telegram-бот для игры 67
// Запуск: node bot.js
// Токен передаётся через переменную среды BOT_TOKEN

const TelegramBot = require('node-telegram-bot-api');

const TOKEN   = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL; // URL Vercel-приложения (index.html)

if (!TOKEN)   throw new Error('Нет BOT_TOKEN в переменных среды');
if (!APP_URL) throw new Error('Нет APP_URL в переменных среды');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '🃏 *Игра 67* — карточная игра для 2–4 игроков.\n\nНажмите кнопку чтобы начать:', {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[
        { text: '🎮 Играть', web_app: { url: APP_URL } }
      ]]
    }
  });
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, `*Правила игры 67:*\n
🃏 28 карт: масти + ☽ ♚ ☀, номиналы 6 В Д К Т 7 8
♚ — козырная масть
+ — особая масть, кроется только картами +

*Спецкарты:*
• 6 — переворачивает направление хода
• 7 — нельзя перебить шестёркой
• 8 — переворот + право хода тому кто бросил
• Д+ — бьёт всё, все карты в биту, переворот

*Цель:* первым избавиться от всех карт`, { parse_mode: 'Markdown' });
});

bot.on('polling_error', (err) => console.error('polling error:', err.message));
console.log('Бот 67 запущен ✓');
