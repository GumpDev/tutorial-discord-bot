const config    = require("../config.json");
const commands  = require("../scripts/commandsReader")(config.prefix);

const descriptions = {
    "!ajuda": "Use esse comando para ver os comandos disponiveis",
    "!aviso": "Avise as pessoas do server",
    "!clear": "Limpe o chat",
    "!ping":  "Pingue o bot"
};
const permissions = config.permissions;

module.exports = async (client,msg) =>{
    var texto = "Comandos:";
    Object.keys(commands).forEach(command => {
        if(verificarPermissao(msg.member,command))
            texto += `\n ${command}: ${descriptions[command] ? descriptions[command] : 'Não tem descrição'}`
    });
    msg.reply(texto);
};

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