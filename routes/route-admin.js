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
    Categoria.find().sort({date: 'desc'}).lean().then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro ao listar as Categorias')
        res.redirect('/admin')
    })
})


router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {

     // Validação dos Formulários

     var erros = []

     if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome Inválido'})
     }

     if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: 'Slug Inválido'})
     }

     if(req.body.nome.length < 2){
        erros.push({ texto: 'Nome da categoria muito pequeno'})
     }
     
     if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
     } else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria adcionada com sucesso")
            //console.log('Categoria Adicionada com Sucesso')
            res.redirect("/admin/categorias")
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente")
            res.redirect('/admin')
        })
    }
})
    
        
     


    

// devemos exportar o router para usar em outros locais
module .exports = router