require("dotenv").config();
const Eris = require("eris");
const bot = new Eris(process.env.TOKEN, {
    intents: ["guilds"]
});

bot.on("ready", () => {
    console.log("bot online");
});

bot.on("guildUpdate", (guild, oldGuild) => {
    const old_vanity = oldGuild.vanityURL
    const new_vanity = guild.vanityURL
    const server_id = guild.id
    console.log(old_vanity, server_id);
    console.log(new_vanity, server_id);
});

bot.connect();