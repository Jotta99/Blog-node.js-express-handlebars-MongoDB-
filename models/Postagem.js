const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Config Date

var date = new Date()
var day = date.getDate()
var month = date.getMonth() + 1;

var date = new Date()
var day = date.getDate()
var month = date.getMonth() + 1;
var year = date.getFullYear()
var hour = date.getHours()
var minutes = date.getMinutes()

function DatesNow(month) {

  const Months = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro'
  }
  return Months[month] || Months.default
}

const atualDate = `${day} de ${DatesNow(month)} de ${year} às ${hour}:${minutes}`

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias',
        require: true
    },
    date: {
        type: String,
        default: atualDate,
    },
})

mongoose.model('postagens', Postagem)

module.exports = Postagem