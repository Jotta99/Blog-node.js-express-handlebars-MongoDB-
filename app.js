const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const admin = require('./routes/admin') // Importando arquivo de rotas admin
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

// Configs
    // Session
    app.use(session({
        secret: 'cursodenode',
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    //Middleware
    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })

    // Body Parser
    app.use(express.urlencoded({extended:true}))
    app.use(express.json());

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogapp', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Conectado ao banco de dados')
    }).catch((err)=>{
        console.log(`Erro ao conectar ao banco de dados: ${err}`)
    })

    // Public
    app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.get('/', (req, res)=>{
    res.render('admin/homepage')
})

app.use('/admin', admin)

// Outros
app.listen(PORT, ()=>{
    console.log(`A Servidor está rodando em: http://localhost:${PORT}`)
})