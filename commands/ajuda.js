const config    = require("../config.json");
const commands  = require("../scripts/commandsReader")(config.prefix);

const descriptions = {
    "!ajuda": "Use esse comando para ver os comandos disponiveis",
    "!aviso": "Avise as pessoas do server",
    "!clear": "Limpe o chat",
    "!ping":  "Pingue o bot"
};


module.exports = async (client,msg) =>{
    var texto = "Comandos:";
    Object.keys(commands).forEach(command => {
        texto += `\n ${command}: ${descriptions[command] ? descriptions[command] : 'Não tem descrição'}`
    });
    msg.reply(texto);
};