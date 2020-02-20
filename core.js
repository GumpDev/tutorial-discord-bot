const Discord   = require("discord.js");
const client    = new Discord.Client();

const config    = require("./config.json");
const commands  = require("./scripts/commandsReader")(config.prefix);

const unknowCommand = require("./scripts/unknowCommand");

client.on("ready",()=>{
    console.log(`Logando com o bot ${client.user.tag}`);
});


client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]) commands[args[0]](client,msg);
        else if(args[0].split("")[0] == config.prefix) unknowCommand(client,msg);
    }
});

client.login(config.token);