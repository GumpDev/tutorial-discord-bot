const config = require("../config.json");

module.exports = async (client,msg) =>{
    const avisoChannel = await msg.guild.channels.cache.find(channel=>channel.id == config.avisosChannelId);
    
    var message = msg.content.split(" ");
    message.splice(0,1);
    message = message.join(" ");
    await avisoChannel.send(`@everyone ${message}`);
    msg.reply(`Avisado no canal ${avisoChannel}`);
}