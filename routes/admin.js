const express = require('express')
const router = express.Router()

// Usado o mongoose de forma externa
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

router.get('/', (req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.send('Página de posts')
})

router.get('/usuarios', (req, res) => {
    Usuario.find().lean().sort({date: 'desc'}).then((usuarios) => {
        res.render('admin/usuarios', {usuarios: usuarios})
    })
})

router.get('/categorias', (req, res) => {
    Categoria.find().lean().sort({date: 'desc'}).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    })
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res)=>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null){
        erros.push({texto: 'Nome inválido'})
    }

    if(req.body.nome.length < 6){
        erros.push({texto: 'Mínimo de caracteres: 6'})
    }

    if(!req.body.slug || typeof req.body.slug === undefined || req.body.slug === null){
        erros.push({texto: 'Slug inválido'})
    }

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    }

    else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug,
        }
        new Categoria (novaCategoria).save()
        .then(()=>{
            req.flash('success_msg', 'Categoria criada com sucesso!')
            res.redirect('/admin/categorias')
        })
        .catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente!')
            console.log(err)
        })
    }
})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err)=>{
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', (req, res)=>{
    Categoria.findOne({_id: req.body.id}).then((categoria)=>{
        
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
            req.flash('success_msg', 'Categoria editada com sucesso!')
            res.redirect('/admin/categorias')            
        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro interno ao salvar a edição da categoria')
            res.redirect('/admin/categorias')
        })
    }).catch((err)=>{
        req.flash('error_msg', 'Houve um erro ao editar essa categoria')
        res.redirect('/admin/categorias')
    })
})

router.get('/categorias/delete/:id', (req, res) =>{
    Categoria.findOneAndDelete({_id: req.params.id}).lean().then((categoria)=>{
        req.flash('success_msg', 'Sucesso ao deletar categoria')
        res.redirect('/admin/categorias')
    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao deletar categoria')
        res.redirect('/admin/categorias')
    })
})

// Posts Routers

router.get('/postagens/add', (req, res) =>{
    Categoria.find().lean().then((categorias)=>{
        res.render('admin/addpostagem', {categorias: categorias})
    }).catch((err)=>{
        req.flash('error_msg', 'Aconteceu um erro ao carregar o formulário')
        res.redirect('/admin')
    })

})

router.post('/postagens/nova', (req, res)=>{

    var erros = []

    if(!req.body.titulo || typeof req.body.titulo === undefined || req.body.titulo === null){
        erros.push({texto: 'Título inválido'})
    }

    if(req.body.titulo.length < 5){
        erros.push({texto: 'Mínimo de caracteres: 5'})
    }

    if(!req.body.slug || typeof req.body.slug === undefined || req.body.slug === null){
        erros.push({texto: 'Slug inválido'})
    }

    if(!req.body.descricao || typeof req.body.descricao === undefined || req.body.descricao === null){
        erros.push({texto: 'Descrição inválida'})
    }

    if(req.body.descricao.length < 10){
        erros.push({texto: 'Mínimo de caracteres da descrição: 10'})
    }

    if(!req.body.conteudo || typeof req.body.conteudo === undefined || req.body.conteudo === null){
        erros.push({texto: 'Conteúdo inválido'})
    }

    if(req.body.conteudo.length < 20){
        erros.push({texto: 'Mínimo de caracteres do conteúdo: 20'})
    }

    if(req.body.categoria === 0){
        erros.push({texto: 'Categoria inválida, registre uma categoria'})
    }

    if(erros.length > 0){
        res.render('admin/addpostagem', {erros: erros})
    }

    else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug,
        }
        new Postagem (novaPostagem).save()
        .then(()=>{
            req.flash('success_msg', 'Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        })
        .catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao salvar a postagem, tente novamente!')
            console.log(err)
            res.redirect('/admin/addpostagem')
        })
    }
})

router.get('/postagens', (req, res) => {
    Postagem.find().lean().populate({path: 'categorias', strictPopulate: false}).sort({date: "desc"}).then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens, Erro: " + err)
        res.redirect("/admin")
    })
})

router.get('/postagens/edit/:id', (req, res)=>{
    Postagem.findOne({_id: req.params.id}).then((postagem)=>{
        Categoria.find().then((categorias)=>{
            res.render('admin/editpostagens', {categorias: categorias, postagem: postagem})
        }).catch(()=>{
            req.flash('error_msg', 'Houve um erro ao buscar categorias')
            res.redirect('/admin/postagens')
        })
    }).catch((err)=>{
        req.flash('Ocorreu um erro ao carregar ')
    })

})

router.post('/postagens/edit', (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem)=>{
        
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        
        postagem.save().then(()=>{
            req.flash('success_msg', 'Categoria editada com sucesso!')
            res.redirect('/admin/postagens')            
        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro interno ao salvar a edição da categoria')
            res.redirect('/admin/postagens')
        })
    }).catch((err)=>{
        req.flash('error_msg', 'Houve um erro ao editar essa categoria')
        res.redirect('/admin/postagens')
    })
})

router.get('/postagens/delete/:id', (req, res) =>{
    Postagem.findOneAndDelete({_id: req.params.id}).lean().then((postagem)=>{
        req.flash('success_msg', 'Sucesso ao deletar postagem')
        res.redirect('/admin/postagens')
    }).catch((err)=>{
        req.flash('error_msg', 'Erro ao deletar postagem')
        res.redirect('/admin/postagens')
    })
})

router.get('/postagem/:id', (req, res) =>{
    Postagem.findOne({_id: req.params.id}).lean().then((postagem) =>{
        res.render('admin/postagempage', {postagem: postagem})
    }).catch((err)=>{
        req.flash('error_msg', 'Houve um erro ao abrir esta categoria')
        res.redirect('/')
    })
})

module.exports = router;