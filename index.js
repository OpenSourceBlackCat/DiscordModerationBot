require("dotenv").config();
const fs = require("fs");
const path = require("path");
const {Client, GatewayIntentBits} = require("discord.js");
const WelcomeBot = require("./DiscordBot/Welcome.js");
const DiscordBot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]});
const configParser = (configFolder) =>{
    const allConfigJson = {};
    var configFolderPath = path.join(__dirname, configFolder);
    fs.readdirSync(configFolderPath)
    .forEach(configFile=>{
        allConfigJson[`${configFile.replace(".json", "")}`] = JSON.parse(fs.readFileSync(`${configFolderPath}/${configFile}`));
    });
    return allConfigJson;
}
const allConfigData = configParser("Configs");
WelcomeBot(DiscordBot, allConfigData.Welcome);
DiscordBot.on("ready", ()=>{
    console.log("Meow");
});
DiscordBot.on("messageCreate", async(ctx)=>{
    if(!ctx.author.bot){
        await ctx.reply(ctx.content);
    }
});
DiscordBot.login(process.env.TOKEN);