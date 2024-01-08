const {Events} = require("discord.js");
module.exports = SpamHandler = async(DiscordBot, Config) =>{
    const memberMap = new Map();
    DiscordBot.on(Events.MessageCreate, async(ctx) =>{
        // if(!ctx.author.bot && ctx.member.hasPermission("ADMINISTRATOR")){
        //     console.log("Meow");
        // }
    });
}