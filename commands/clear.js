module.exports = async (client,msg) =>{
    const channel   = msg.channel;
    const FetchMsg  = await channel.messages.fetch();
    await channel.bulkDelete(FetchMsg,true);
    msg.reply("Chat Limpo!");
}