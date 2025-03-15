const TelegramBot = require("node-telegram-bot-api");

const token = "7607385443:AAER6hSgawIxtJa8AplW6jyRrJndnI_kN7k";

const bot = new TelegramBot(token, { polling: true });

module.exports = bot;
