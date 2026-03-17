require("dotenv").config();
const Eris = require("eris");
const bot = new Eris(process.env.TOKEN, {
    intents: ["guilds", "guildMembers", "directMessages", "messageContent"]
});

bot.on("ready", () => {
    console.log("bot online");
});

bot.on("guildUpdate", (guild, oldGuild) => {
    const old_vanity = oldGuild.vanityURL
    const new_vanity = guild.vanityURL
    const everyone_role = guild.id
    const new_perms = everyone_role.permissions & ~1024

    if (new_vanity !== old_vanity) {
        bot.editRole(guild.id, everyone_role, { permissions: new_perms}, "hiding server");
    }

});

bot.connect();