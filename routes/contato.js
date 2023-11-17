const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Config mongoose models
require('../models/Contato')
const Contato = mongoose.model('mensagens')

//Rotas

router.get('/', (req, res)=>{
    res.render('contato/index')
})

router.post('/mensagem', (req, res)=>{

        const novaMensagem = {
            nome: req.body.nome,
            email: req.body.email,
            numerotel: req.body.numerotel,
            mensagem: req.body.mensagem
        }
        new Contato (novaMensagem).save()
        .then(()=>{
            req.flash('success_msg', 'Mensagem enviada!')
            res.redirect('/contato')
        })
        .catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao enviar mensagem, tente novamente!')
            console.log(err)
        })
})

module.exports = router;