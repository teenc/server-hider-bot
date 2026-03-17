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


bot.on("guildMemberAdd", async (guild, member) => {
    const user_id = member.user.id;
    const guild_id = guild.id
    const current_van = guild.vanityURL
    const embed = {
        description: `> **Vanity: [/${current_van}](https://discord.gg/${current_van})** \n> **Telegram: https://t.me/blahblahblah**`,
        color: 0x101010
    }
    const embed2 = {
        image: {
        url: "https://i.pinimg.com/originals/c8/38/50/c838509cd460815c2f3ace89487e3fdf.gif"
        },
        color: 0x101010
    }

    try {
        const dm = await bot.getDMChannel(user_id) 
        await dm.createMessage({ embeds: [embed, embed2] })

        await bot.kickGuildMember(guild_id, user_id, 'not allowed.')
    } catch (error){
        console.error(`${user_id} new member has joined ${guild_id}:`, error);
    }
});



bot.connect();