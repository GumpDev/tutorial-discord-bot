const Discord   = require("discord.js");
const client    = new Discord.Client();

const config    = require("./config.json");
const commands  = require("./scripts/commandsReader")(config.prefix);

const unknowCommand = require("./scripts/unknowCommand");

const permissions = config.permissions;

client.on("ready",()=>{
    console.log(`Logando com o bot ${client.user.tag}`);
});

client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]){
            if(verificarPermissao(msg.member,args[0]))
                commands[args[0]](client,msg);
            else msg.reply("você não tem permissão para executar esse comando!");
        }else if(args[0].startsWith(config.prefix)) unknowCommand(client,msg);
    }
});

client.on("guildMemberAdd",(member)=>{
    const boasVindasChannel = member.guild.channels.cache.find(channel=>channel.id == config.boasVindasChannelId);
    boasVindasChannel.send(`${member.user} acabou de entrar em nosso servidor :P yey`);
    member.send("Bem vindo ao nosso servidor\nSe divirta 😃");
});
client.on("guildMemberRemove",(member)=>{
    const boasVindasChannel = member.guild.channels.cache.find(channel=>channel.id == config.boasVindasChannelId);
    boasVindasChannel.send(`${member.user} saiu do server :( awwww 😔`);
});

function verificarPermissao(member,command){
    let verification = !permissions[command];
    if(!verification){
        const perms = permissions[command];
        perms.forEach(p =>{
            switch(p.type){
                case "role":
                    if(member.roles.cache.has(p.value)) verification = true;
                break;
                case "permission":
                    if(member.permissions.has(p.value)) verification = true;
                break;
            }
        });
    }
    return verification;
}

client.login(config.token);