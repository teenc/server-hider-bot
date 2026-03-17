require("dotenv").config();
const Eris = require("eris");
const bot = new Eris(Process.env.TOKEN, {
    intents: ["guilds"]
});



bot.connect();