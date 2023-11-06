const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const admin = require('./routes/admin') // Importando arquivo de rotas admin
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const multer = require('multer')

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

    // Multer
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    
    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    }));
    app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogapp', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log('Conectado ao banco de dados')
    }).catch((err)=>{
        console.log(`Erro ao conectar ao banco de dados: ${err}`)
    })

    require('./models/Categoria')
    const Categoria = mongoose.model('categorias')
    
    require('./models/Postagem')
    const Postagem = mongoose.model('postagens')

    // Public
    app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.get('/', (req, res)=>{
    Postagem.find().lean().populate({path: 'categorias', strictPopulate: false}).sort({date: "desc"}).then((postagens) => {

        Categoria.findOne().lean().sort({date: "desc"}).then((categorias) => {
            res.render("admin/homepage", {postagens: postagens, categorias: categorias})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as postagens, Erro: " + err)
            res.redirect("/admin")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens, Erro: " + err)
        res.redirect("/admin")
    })
})

app.use('/admin', admin)

// Outros
app.listen(PORT, ()=>{
    console.log(`A Servidor está rodando em: http://localhost:${PORT}`)
})