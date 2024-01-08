const {EmbedBuilder, SlashCommandBuilder, Events, PermissionFlagsBits, Embed} = require("discord.js");
module.exports = RoleSelector = async(DiscordBot, Config) =>{
    const slashCommands = [
        new SlashCommandBuilder()
        .setName("send_role_message")
        .setDescription("Sends The Role Selection Embed Message.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        new SlashCommandBuilder()
        .setName("delete_role_message")
        .setDescription("Deletes The Current Role Selection Message.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ]
    const sendRoleSelectorEmbed = async(ctx) =>{
        const roleSelectorEmbed = new EmbedBuilder()
        .setTitle("RoleSelector")
        .setDescription("Please Select Your Roles")
        await ctx.channel.send({embeds: [roleSelectorEmbed]})
    }

    DiscordBot.on(Events.InteractionCreate, async(ctx) =>{
        if(ctx.isChatInputCommand()){
            if(ctx.member.permissions.has(PermissionFlagsBits.Administrator)){
                if(ctx.commandName=="send_role_message"){
                    await sendRoleSelectorEmbed(ctx);
                    await ctx.reply("Resent!");
                }
                else if(ctx.commandName=="delete_role_message"){
                    await ctx.reply("Deleted!");
                }
            }
            else{
                await ctx.reply({content:"You Are Not Authorised For This Command!", ephemeral: true})
            }
        }
    })
    return slashCommands;
}