const express = require('express')
// componente para criar rotas em arquivos separados
const router = express.Router();


// definindo as rotas

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get ('/posts', (req, res) => {
    res.send('Paginas dos posts')

})

router.get('/categorias', (req, res) => {
    res.send('Pagina de categorias')
})





// devemos exportar o router para usar em outros locais
module .exports = router