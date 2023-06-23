require('dotenv').config();
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'it.help.nordic@gmail.com',
    pass: 'bcgktlpafcabmroh',
  },
});

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

function sendReminder() {
  const chatId = process.env.CHAT_ID;
  const targetDate = new Date('2023-08-05');
  const today = new Date();
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const message = 'Ingat belajar sertifikasi! Waktu tinggal ' + daysLeft + ' hari lagi!';
  telegramBot.sendMessage(chatId, message);

  const mailOptions = {
    from: 'it.help.nordic@gmail.com',
    to: 'andryputra360@gmail.com',
    subject: 'Pengingat Sertifikasi Microsoft System Administrator',
    text: '',
  };
  mailOptions.text = 'Ingat belajar sertifikasi! Waktu tinggal ' + daysLeft + ' hari lagi!';

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email pengingat telah terkirim: ' + info.response);
    }
  });
}

sendReminder();
cron.schedule('0 9 * * *', sendReminder); // Pengingat jam 09:00
cron.schedule('0 12 * * *', sendReminder); // Pengingat jam 12:00
cron.schedule('0 14 * * *', sendReminder); // Pengingat jam 14:00
cron.schedule('0 16 * * *', sendReminder); // Pengingat jam 16:00
cron.schedule('0 18 * * *', sendReminder); // Pengingat jam 18:00
cron.schedule('0 19 * * *', sendReminder); // Pengingat jam 19:00
cron.schedule('0 21 * * *', sendReminder); // Pengingat jam 21:00

const targetDate = new Date('2023-08-05');
const today = new Date();
const timeDiff = targetDate.getTime() - today.getTime();
const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
console.log('Ingat belajar sertifikasi! Waktu tinggal ' + daysLeft + ' hari lagi!');
