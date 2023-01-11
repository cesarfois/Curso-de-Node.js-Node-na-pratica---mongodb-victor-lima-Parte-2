const express = require('express')
// componente para criar rotas em arquivos separados
const router = express.Router();
const mongoose = require('mongoose')
const Categoria = require('../models/Categoria')


// definindo as rotas

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get ('/posts', (req, res) => {
    res.send('Paginas dos posts')

})

router.get('/categorias', (req, res) => {
    res.render("admin/categorias")
})


router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(() => {
        console.log('Categoria Adicionada com Sucesso')
    }).catch((error) => {
        console.log("Falha ao salvar Categoria" + error)
    })
})


// devemos exportar o router para usar em outros locais
module .exports = router