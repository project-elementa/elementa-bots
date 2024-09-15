process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350 = 0;

import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import * as BF from './modules/blockchain.js';
import sharp
 from 'sharp';
dotenv.config();
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TG_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const data = await BF.getNFT(1)
    // console.log(data.image)
    const base64Data = data.image.split(',')[1];
    const svgBuffer = Buffer.from(base64Data, 'base64');
    await sharp(svgBuffer)
        .png()
        .toBuffer()
        .then(pngBuffer => {
            bot.sendPhoto(chatId, pngBuffer);
        })
        .catch(err => {
            console.error('SVG를 PNG로 변환하는 중 오류 발생:', err);
            bot.sendMessage(chatId, '이미지 처리 중 오류가 발생했습니다.');
        });

    

});