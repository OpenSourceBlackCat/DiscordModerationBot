const {EmbedBuilder} = require("discord.js");
module.exports = WelcomeBot = async(DiscordBot, Config) =>{
    DiscordBot.on("guildMemberAdd", async(ctx) =>{
        const welcomeEmbed = new EmbedBuilder()
        .setTitle(Config.WelcomeTitle)
        .setDescription(Config.WelcomeDescription)
        .setColor(Config.WelcomeColor)
        .setImage(Config.WelcomeImage)
        .setFooter({text: ctx.guild.name, iconURL: (ctx.guild.icon ? ctx.guild.icon : Config.WelcomeServerIcon)})
        var welcomeChannel = await ctx.guild.channels.fetch(Config.WelcomeChannel)
        await welcomeChannel.send({embeds: [welcomeEmbed]});
    });
}