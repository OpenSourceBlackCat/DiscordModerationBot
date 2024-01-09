const {Events, ChannelType} = require("discord.js");
module.exports = PrivateChannel = async(DiscordBot, Config) =>{
    DiscordBot.on(Events.ClientReady, async() =>{
        const privateChannel = await DiscordBot.channels.fetch(Config.PrivateChannel);
        DiscordBot.on(Events.VoiceStateUpdate, async(oldVState, newVState) =>{
            if(newVState.channel && newVState.channel==privateChannel){
                const joinedUser = await DiscordBot.users.fetch(newVState.id);
                await newVState.guild.channels.create({name:joinedUser.globalName, type: ChannelType.GuildVoice, parent: newVState.channel.parent.id});
                console.log("Joined");
            }
            else{
                if(oldVState.channel){
                    // (oldVState.id)
                    console.log("Left");
                }
            }
        })
    })
}