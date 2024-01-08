require("dotenv").config();
const fs = require("fs");
const path = require("path");
const {Client, Events, GatewayIntentBits} = require("discord.js");
const WelcomeBot = require("./DiscordBot/Welcome.js");
const SpamHandler = require("./DiscordBot/SpamHandler.js");
const RoleSelector = require("./DiscordBot/RoleSelector.js");
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
WelcomeBot(DiscordBot, allConfigData.WelcomeBot);
console.log("WelcomeBot Loaded.")
RoleSelector(DiscordBot, allConfigData.RoleSelector);
console.log("[WIP] RoleSelector Loaded.");
SpamHandler(DiscordBot, allConfigData.SpamHandler);
console.log("[WIP] SpamHandler Loaded.")
DiscordBot.on(Events.ClientReady, ()=>{
    console.log("Discord Moderator Bot Is Running Successfully.");
});
DiscordBot.login(process.env.TOKEN);