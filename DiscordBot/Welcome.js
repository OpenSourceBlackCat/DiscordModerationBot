const {EmbedBuilder} = require("discord.js");
module.exports = WelcomeBot = async(DiscordBot, Config) =>{
    DiscordBot.on("guildMemberAdd", async(ctx) =>{
        console.log(ctx.guild)
        const welcomeEmbed = new EmbedBuilder()
        .setTitle(Config.WelcomeTitle)
        .setDescription(Config.WelcomeDescription)
        .setImage(Config.WelcomeImage)
        .setFooter({text: ctx.guild.name, iconURL: (ctx.guild.icon ? ctx.guild.icon : Config.WelcomeServerIcon)})
        await ctx.guild.channels.fetch(Config.WelcomeChannel).send({embeds: welcomeEmbed});
    });
}