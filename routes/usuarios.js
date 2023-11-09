const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Model Config
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

// Rotas
router.get('/registro', (req, res) =>
    res.render('usuarios/registro')
)

router.post('/registro/novo', (req, res)=>{

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

    else{

        Usuario.findOne({email: req.body.email}).then((usuario)=>{
            if(usuario) {
                req.flash('error_msg', 'Este e-mail já está em uso!')
                res.redirect('/usuarios/registro')
            }else{
                const novoUsuario = {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                }

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (err, hash)=>{
                        if(err) {
                            req.flash('error_msg', 'Houve um erro durante o salvamento! ' + err)
                        }

                        novoUsuario.senha = hash

                        new Usuario (novoUsuario).save().then(()=>{

                            req.flash('success_msg', 'Usuário criado com sucesso!')
                            res.redirect('/')
        
                        })
                        .catch((err)=>{
        
                            req.flash('error_msg', 'Houve um erro ao criar usuário, tente novamente!')
                            console.log(err)
                            
                        })
                    
                    })
                })
            }
        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro interno! ' + err)
            res.redirect('/usuarios/registro')
        })

    }
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