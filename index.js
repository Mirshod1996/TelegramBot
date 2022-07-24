TELEGRAM_BOT_TOKEN = "5593033663:AAGlTrxbQi-wAsmP-JOlNRhXrH-scggorb4";
const TeleBot = require("telebot");
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

const chatIds = [];
const CronJob = require("cron").CronJob;
const job = new CronJob(
  "0/5  * * * * *",
  function () {
    console.log("You will see this message every 5 second");
    chatIds.forEach((chatId) => {
      bot.sendMessage(chatId, "Hello");
    });
    console.log(chatIds);
  },
  null,
  true
);

bot.on("text", (msg) => msg.reply.text("New message:/" + msg.text));

bot.on(["/start"], (msg) => {
  let chatId = msg.chat.id;
  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId);
    msg.reply.text("started!");
    job.start();
  }
});

bot.on(["/stop"], (msg) => {
  let chatId = msg.chat.id;
  if (!chatIds.includes(chatId)) {
    chatIds.pop(chatId);

    msg.reply.text("deleted!");
    job.stop();
  }
});
bot.start();
