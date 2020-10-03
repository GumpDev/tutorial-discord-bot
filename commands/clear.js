module.exports = async (client,msg) =>{
     if(isNaN(args[0])) return message.channel.send("Você precisa usar números válidos!")
    const channel   = msg.channel;
    const FetchMsg  = await channel.messages.fetch();
    await channel.bulkDelete(FetchMsg,true);
    msg.reply("Chat Limpo!");
}
