const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Config Date

var date = new Date()
var day = date.getDate()
var month = date.getMonth() + 1;
var year = date.getFullYear()
var arrMonth = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

if(month === 1){
month = arrMonth[0]
}
if(month === 2){
  month = arrMonth[1]
}
if(month === 3){
  month = arrMonth[2]
}
if(month === 4){
  month = arrMonth[3]
}
if(month === 5){
  month = arrMonth[4]
}
if(month === 6){
  month = arrMonth[5]
}
if(month === 7){
  month = arrMonth[6]
}
if(month === 8){
  month = arrMonth[7]
}
if(month === 9){
  month = arrMonth[8]
}
if(month === 10){
  month = arrMonth[9]
}
if(month === 11){
  month = arrMonth[10]
}
if(month === 12){
  month = arrMonth[11]
}

const atualDate = `${day} de ${month} de ${year}`

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