const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const admin = require('./routes/admin') // Importando arquivo de rotas admin
const path = require('path')

// Configs
    // Body Parser
    app.use(express.urlencoded({extended:true}))
    app.use(express.json());

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Mongoose

    // Public
    app.use(express.static(path.join(__dirname, 'public')))


// Rotas
app.get('/', (req, res)=>{
    res.send('Home Page')
})

app.use('/admin', admin)

// Outros
app.listen(PORT, ()=>{
    console.log(`A aplicação está rodando em: http://localhost:${PORT}`)
})