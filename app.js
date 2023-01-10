const express = require('express');
const app = express();
const handlebars= require('express-handlebars');
const bodyParser = require('body-parser');

//const mongoose = require('mongoose');
// arquivo necessario para falar para o express onde esta as rotas
const admin = require('./routes/route-admin');

// Configurações
 

    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');


// Rotas

   app.use('/admin', admin)

const port = 8081

 app.listen(port, () => {
    console.log('Servidor Rodando!')
 })