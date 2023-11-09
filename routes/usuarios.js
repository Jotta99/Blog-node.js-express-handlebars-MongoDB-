const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

router.get('/registro', (req, res) =>
    res.render('usuarios/registro')
)

router.post('/registro/novo', (req, res)=>{

    Usuario.findOne({nome: req.body.nome}).then((usuarios)=>{
        erros.push({texto: 'Já existe um usuário cadastrado com esse nome!'})
    }).catch((err)=>{

    var erros = []

    if(req.body.nome.length < 6 || !req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome inválido. Mínimo de caracteres: 6'})
    }
    
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: 'Email inválido'})
    }
    
    if(req.body.senha.length < 5 || !req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Senha inválida. Mínimo de caracteres: 6'})
    }

    if(req.body.senha !== req.body.senha2){
        erros.push({texto: 'As senhas não são iguais. Por favor, preencha novamente!'})
    }
    
    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }
    

    if(Usuario.findOne({email: req.body.email})){
        erros.push({texto: 'Este e-mail já está cadastrado!'})
    }

    else{
        const novoUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
        new Usuario (novoUsuario).save()
        .then(()=>{
            req.flash('success_msg', 'Usuário criado com sucesso!')
            res.redirect('/')
        })
        .catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao criar usuário, tente novamente!')
            console.log(err)
        })
    }
    })
})

router.get('/login', (req, res) => {
    res.render('usuarios/login')
})

router.post('/login/account', (req, res) => {

    var erros = []

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: 'Email inválido'})
    }
    
    if(req.body.senha.length < 5 || !req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Senha inválida.'})
    }
    
    if(erros.length > 0){
        res.render('usuarios/login', {erros: erros})
    }
    
    else{
        Usuario.findOne({email: req.body.email, senha: req.body.senha}).then((usuario) => {
            req.flash('success_msg', `Bem-vindo! ${usuario.nome}`)
            res.redirect('/')
        }).catch((err) => {
            req.flash('error_msg', 'Este usuário não existe, cadastre uma conta!')
            res.redirect('/usuarios/login')
        })
    }
})


module.exports = router;