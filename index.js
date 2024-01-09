require("dotenv").config();
const fs = require("fs");
const path = require("path");
const {Client, Events, GatewayIntentBits, REST, Routes, ActivityType} = require("discord.js");
const WelcomeBot = require("./DiscordBot/Welcome.js");
const SpamHandler = require("./DiscordBot/SpamHandler.js");
const RoleSelector = require("./DiscordBot/RoleSelector.js");
const PrivateChannel = require("./DiscordBot/PrivateChannel.js");
const DiscordBot = new Client({intents: Object.keys(GatewayIntentBits)});
const REST_API = new REST().setToken(process.env.TOKEN);
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
const WelcomeBotObject = WelcomeBot(DiscordBot, allConfigData.WelcomeBot);
console.log("WelcomeBot Loaded.")
const RoleSelectorObject = RoleSelector(DiscordBot, allConfigData.RoleSelector);
console.log("[WIP] RoleSelector Loaded.");
const SpamHandlerObject = SpamHandler(DiscordBot, allConfigData.SpamHandler);
console.log("[WIP] SpamHandler Loaded.")
const PrivateChannelObject = PrivateChannel(DiscordBot, allConfigData.PrivateChannel);
console.log("[WIP] PrivateChannel Loaded.");

DiscordBot.on(Events.ClientReady, async()=>{
    await REST_API.put(Routes.applicationCommands(process.env.BOT_CLIENT, process.env.GUILD), {body: await RoleSelectorObject});
    await DiscordBot.user.setPresence({status: "dnd", activities:[{name:"OpenSourceBlackCat", type:ActivityType.Listening}]})
    console.log("Discord Moderator Bot Is Running Successfully.");
});
DiscordBot.login(process.env.TOKEN);