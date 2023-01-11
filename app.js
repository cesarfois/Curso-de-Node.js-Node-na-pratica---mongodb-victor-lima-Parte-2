const express = require('express');
const app = express();
const handlebars= require('express-handlebars');
const bodyParser = require('body-parser');

//const mongoose = require('mongoose');
// arquivo necessario para falar para o express onde esta as rotas
const admin = require('./routes/route-admin');
const path = require('path')

// Configurações
 

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Public
    app.use(express.static(path.join(__dirname,'/public')))

// Rotas

   app.use('/admin', admin)

const port = 8081

 app.listen(port, () => {
    console.log('Servidor Rodando!')
 })