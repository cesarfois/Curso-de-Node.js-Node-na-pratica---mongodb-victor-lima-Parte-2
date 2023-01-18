const express = require('express')
// componente para criar rotas em arquivos separados
const router = express.Router();
const mongoose = require('mongoose')
const Categoria = require('../models/Categoria')
const Postagem = require('../models/Postagem')


require('../models/Postagem')

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

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id}).lean().then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((error) => {
        req.flash('error_msg', "Esta Categoria não existe")
        res.redirect('/admin/categorias')
    })
})
    
router.post('/categorias/edit', (req, res) => {

    Categoria.findOne({_id: req.body.id}).then((categoria) => {

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash("success_msg", "Categora editada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((error) => {
            req.flash('error_msg', "Houve um erro interno ao salvar a edição da categoria")
            res.redirect("/admin/categorias")

        })

    }).catch((error) => {
        req.flash('error_msg', "Houve um erro ao editar a categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", (req,res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso! ")
        res.redirect('/admin/categorias')
    }).catch((error) =>{
        req.flash('error_msg', "Falha ao deletar a Categoria")
        res.redirect("/admin/categorias")
    })
})


router.get("/postagens", (req, res) => {
    res.render('admin/postagens')
})

router.get("/postagens/add", (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/addpostagens', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', "Houve um erro ao carregar o formulario")
        res.redirect('/admin')
    })
    
})

router.post("/postagens/nova", (req, res) => {
    var erros = []


    if(req.body.categoria == "0"){
        erros.push({texto: "Categoria inválida, registre uma categoria"})
    }
    if(erros.length > 0){
        res.render("admin/addpostagem", {erros: erros})

    }else{console.log('postagem atributos')

        const novaPostagem = {
            
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            console.log('postagem ok')
            req.flash("success_msg", "Postagem criada com successo! ")
            res.redirect("/admin/postagens")
        }).catch((err) =>{
            console.log('postagem err')
            req.flash("error_msg", "Houve um erro durante o salvamento da Postagem! ")
            res.redirect("/admin/postagens")
        })
    }

})


    

// devemos exportar o router para usar em outros locais
module .exports = router