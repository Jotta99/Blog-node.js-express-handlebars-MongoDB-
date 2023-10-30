const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Postagem = new Schema({
    titulo: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    conteudo: {
        type: String,
        require: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categoria',
        require: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }
})

mongoose.model('postagens', Postagem)

module.exports = Postagem