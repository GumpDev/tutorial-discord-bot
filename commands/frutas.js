module.exports = async (client,msg) =>{
    const message = await msg.reply(`Escolha uma fruta!`);
    message.react('🍉')
        .then(()=> message.react('🍊'))
        .then(()=> message.react('🍌'))
        .then(()=> message.react('🍎'))

    const filter = (reaction, user) =>{
        return ['🍉','🍊','🍌','🍎'].includes(reaction.emoji.name) && user.id == msg.author.id;
    }

    message.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
        .then(collected =>{
            const reaction = collected.first();

            switch(reaction.emoji.name){
                case '🍉':
                    msg.reply("Vocẽ escolheu a 🍉 melancia!");
                case '🍊':
                    msg.reply("Vocẽ escolheu a 🍊 laranja!");
                case '🍌':
                    msg.reply("Vocẽ escolheu a 🍌 banana!");
                case '🍎':
                    msg.reply("Vocẽ escolheu a 🍎 maçã!");
            }

            message.delete();
        })
        .catch(collected =>{
            message.delete();
            msg.reply("Vocẽ demorou muito para escolher.");
        })
}