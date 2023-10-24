const express = require('express')
const handlebars = require('express-handlebars')
const bodeyParse = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000


// Configs
    // Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
    
    // Handlebars

// Rotas

// Outros
app.listen(PORT, ()=>{
    console.log(`A aplicação está rodando em: https://localhost:${PORT}`)
})