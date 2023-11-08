const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

router.get('/registro', (req, res) =>
    res.render('usuarios/registro')
)

router.post('/registro/novouser', (req, res)=>{

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

    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
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

module.exports = router;