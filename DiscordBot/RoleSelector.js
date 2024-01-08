const {Events} = require("discord.js");
module.exports = RoleSelector = async(DiscordBot, Config) =>{
    console.log("Meow");
    DiscordBot.on(Events.MessageCreate, async(ctx) => {
        console.log(ctx);
        await ctx.channel.send(ctx.content);
    })
    DiscordBot.on(Events.InteractionCreate, async(ctx) =>{
        console.log(ctx);
    })
}