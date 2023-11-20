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


const Usuario = new Schema({
    nome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    numerotel:{
        type: String,
        require: true
    },
    nick:{
        type: String,
        require: true
    },
    senha:{
        type: String,
        require: true
    },
    eAdmin:{
        type: Number,
        default: 0
    },
    date:{
        type: String,
        default: atualDate
    },
  })

  mongoose.model('usuarios', Usuario);

  module.exports = Usuario;