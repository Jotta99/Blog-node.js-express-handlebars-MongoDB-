const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('Home Page Admin')
})

router.get('/Post', (req, res)=>{
    res.send('Page Posts')
})

router.get('/categorias', (req, res)=>{
    res.send('Categorias')
})


module.exports = router;