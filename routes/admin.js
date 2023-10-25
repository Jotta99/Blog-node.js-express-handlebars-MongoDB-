const express = require('express')
const router = express.Router()

// Usado o mongoose de forma externa
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.send('Página de posts')
})

router.get('/categorias', (req, res)=>{
    res.render('admin/categorias')
})

router.get('/categorias/add', (req, res)=>{
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res)=>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug,
    }
    new Categoria (novaCategoria).save()
    .then(()=>{
        res.send("Categoria salva com sucesso! :)")
        console.log(`Categoria salva com sucesso! :)`)
    })
    .catch((err)=>{
        console.log(err)
    })
})


module.exports = router;