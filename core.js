const Discord = require("discord.js");
const client  = new Discord.Client();

client.on("ready",()=>{
    console.log(`Logando com o bot ${client.user.tag}`);
});

client.on("message",(msg)=>{
    if(!msg.author.bot){
        console.log(`${msg.author.username}: ${msg.content}`);
        if(msg.content == "ola") msg.reply("ola");
    }
});

client.login("Njc2MjMyNzU4MDExNDk0NDA1.XkCs3g.-cKLeSwOzfn6a4AsLBj7u0SHx8Y");