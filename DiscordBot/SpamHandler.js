const {} = require("discord.js");
module.exports = SpamHandler = async(DiscordBot, Config) =>{
    const memberMap = new Map();
    DiscordBot.on("messageCreate", async(ctx) =>{
        if(!ctx.author.bot && ctx.member.hasPermission("ADMINISTRATOR")){
            console.log("Meow");
        }
    });
}