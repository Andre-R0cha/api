const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario', {
    nome: String,
    responsavel: String,
    habilitado: Boolean,
    mestre: Boolean,
    tags: [{
        id: String,
        habilitada: Boolean,
        validade: Boolean,
        inicio: String,
        fim: String
    }],
    locais: [{
        id: String,
        descricao: String,
        acesso_remoto: Boolean,
        acesso_livre: Boolean,
        horarios: [{
            nome: String,
            inicio: String,
            fim: String,
            diaseguinte: Boolean
        }]
    }]
})



module.exports = Usuario